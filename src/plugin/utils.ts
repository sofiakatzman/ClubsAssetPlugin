const AIRTABLEAPIKEY = process.env.AIRTABLE_API_KEY;
async function loadFonts() {
  console.log("fetching fonts")
  const requiredFonts = [
    { family: "Filson Pro", style: "Bold" },
    { family: "Brandon Text", style: "Bold" },
    { family: "Brandon Text", style: "Regular" },
    { family: "Take Note", style: "Regular" }
  ];

  try {
    //
    // Load all fonts asynchronously
    await Promise.all(requiredFonts.map(async font => {
      try {
        await figma.loadFontAsync(font);
      } catch (error) {
        // Handle font loading error
        console.error(`Failed to load font ${font.family} ${font.style}:`, error);
        figma.notify(`Failed to load font ${font.family} ${font.style}.`);

          // Create a modal dialog UI
          figma.showUI(`
            <html>
              <head>
              </head>
              <body>
                <div class="modal">
                  <h2>Error: Font Not Found</h2>
                  <p>Failed to load font ${font.family} ${font.style}.</p>
                  <p>The plugin will not work as intended with missing fonts.</p> 
                  <p>Please reinstall fonts using the files in this <a href="https://drive.google.com/drive/folders/1Z3MtBR4LLx7Xv28VeMNCtgfvdKevDLZT">Google Drive folder</a>.</p> 
                  <p>If the font is already installed, please uninstall it, reinstall using the Google Drive link above and restart your workstation.</p>
                  <p>For further assistance, or if the above fix does not work as intended, please reach out to Sofia Katzman.</p>
                </div>
          
              </body>
            </html>
          `);
          figma.ui.resize(600, 300);
        throw error;
      }
    }));
    return true; 
  } catch (error) {
    console.error("Font loading error:", error);
    return false; 
  }}

// Type guard for PluginMessage - instanciate when ready to bring in other part of app
// function isPluginMessage(data: any): data is PluginMessage {
//   return data && typeof data.header === 'string';
// }

// Type guard for AirtableResponse
function isAirtableResponse(data: any): data is AirtableResponse {
  return data && Array.isArray(data.records);
}

// Fetch data from Airtable
export function fetchAirTable(airtableURL: string) {
  console.log(airtableURL);
  
  fetch(airtableURL, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${AIRTABLEAPIKEY}`,
      'Content-Type': 'application/json'
    }
  })
  .then(r => r.json())
  .then((data: any) => {
    console.log(data)
    if (isAirtableResponse(data)) {
      data.records.forEach((asset: Asset) => {
        console.log("assets fetched")
        console.log("type: " + asset.fields.Type)
        if (asset.fields.Type === "Half Size") {;
          let variantMapping = asset.fields.Layout
          if(asset.fields.Layout==="Header Only"){
            variantMapping = "CTA=No, PreText=No, SubText=No"
          } else if(asset.fields.Layout==="Header and Subtext"){
            variantMapping = "CTA=No, PreText=No, SubText=Yes"
          } else if(asset.fields.Layout==="Header with CTA"){
            variantMapping = "CTA=Yes, PreText=No, SubText=No"
          } else if(asset.fields.Layout==="Header, CTA and Subtext"){
           variantMapping = "CTA=Yes, PreText=No, SubText=Yes"
          } else if(asset.fields.Layout==="Header, CTA and Pretext"){
            variantMapping = "CTA=Yes, PreText=Yes, SubText=No"
          }

          // Find the component set in Figma
          let componentSet: ComponentSetNode | null = null;
          for (const page of figma.root.children) {
            componentSet = page.findOne(node => node.type === "COMPONENT_SET" && node.name === asset.fields.Type) as ComponentSetNode;
            if (componentSet) {
              console.log('Component set found:', componentSet);
              break;
            }
          }

          if (!componentSet) {
            console.error(`Component set with name "${variantMapping}" not found.`);
            return;
          }

          console.log("generating asset function execution is next")
          generateAsset(
            componentSet,
            asset.fields.Type, // selectedVariant
            variantMapping,
            {
              header: asset.fields.Title,
              cta1: asset.fields.CTA1,
              cta2: asset.fields.CTA2,
              subtext: asset.fields.Subtext,
              pretext: asset.fields.PreText,
              copyright: asset.fields.Copyright,
              backgroundColor: asset.fields.BackgroundColor

            }
          );
        }
      });
    } else {
      console.error('Data is not in AirtableResponse format');
    }
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}

// Define a helper function to change asset background fill color
function changeAssetFillColor(assetNode: GeometryMixin, colorName: string) {
  const colorMap: { [key: string]: { r: number, g: number, b: number } } = {
    pink: { r: 1, g: 0.59, b: 0.71 },
    yellow: { r: 1, g: 0.86, b: 0.37 },
    blue: { r: 0.17, g: 0.45, b: 0.89 },
    green: { r: 0, g: 0.76, b: 0.40 },
    orange: { r: 1, g: 0.62, b: 0.11 },
  };

  const color = colorMap[colorName.toLowerCase()] || colorMap["pink"];

  if (color) {
    assetNode.fills = [{ type: 'SOLID', color }];
    console.log(`Changed asset fill color to ${colorName}`);
  } else {
    console.error(`Color ${colorName} not found in color map.`);
  }
}

// Define a helper function to change text color for ADA compliance
function adaTextFill(assetNode: TextNode, pluginMessage: PluginMessage) {
  if (pluginMessage.backgroundColor === "blue") {
    assetNode.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    console.log("Text changed to white to be ADA compliant!");
    changeCTAVectorsColor();
  }
}

// Define a helper function to change CTA Vectors color
function changeCTAVectorsColor() {
  const ctaVectorNodes = figma.currentPage.findAll(node => node.type === 'VECTOR' && node.name === 'CTAVector') as VectorNode[];
  if (ctaVectorNodes.length > 0) {
    ctaVectorNodes.forEach(ctaVectorNode => {
      ctaVectorNode.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    });
    console.log("All CTAVectors changed to white!");
  } else {
    console.log("No CTAVectors found!");
  }
}

// Define a helper function to handle asset generation for each component set
async function generateAsset(componentSet: ComponentSetNode | undefined, selectedVariant: string | undefined, variantMapping: string, pluginMessage: PluginMessage) {
  // Error if no components found
  await loadFonts();
  console.log("Asset being generated, here are you data points" + componentSet, selectedVariant, variantMapping)
  console.log("Component Set: " + componentSet )
  console.log("Selected Variant: " + selectedVariant )
  console.log("Variant Mapping: " + variantMapping )
  if (!componentSet) {
    console.error(`Component set not found for` + " - " + selectedVariant + " - " + variantMapping);
    return;
  }
  // Error if no variant is selected
  if (!selectedVariant) {
    console.error(`No variant selected for ${componentSet.name}`);
    return;
  }

  // Find matching component
  const selectedComponent = componentSet.findOne(node => node.type === "COMPONENT" && node.name === variantMapping) as ComponentNode;
  console.log("Matching component found!" + selectedComponent)
  
  // Error if no matching component
  if (!selectedComponent) {
    console.error(`No matching component found for ${selectedVariant} in ${componentSet.name}`);
    return;
  }

  // Instantiate new promo
  const newPromo = selectedComponent.createInstance();
  const nodes: SceneNode[] = [newPromo];

  console.log("new instance instanciated!" + newPromo)
  // Find text to replace
  const templateHeader = newPromo.findOne(node => node.name === "Header" && node.type === "TEXT") as TextNode;
  const templateCTA1 = newPromo.findOne(node => node.name === "CTA1" && node.type === "TEXT") as TextNode;
  const templateCTA2 = newPromo.findOne(node => node.name === "CTA2" && node.type === "TEXT") as TextNode;
  const templateSubtext = newPromo.findOne(node => node.name === "Subtext" && node.type === "TEXT") as TextNode;
  const templatePretext = newPromo.findOne(node => node.name === "PreText" && node.type === "TEXT") as TextNode;
  const templateCopyright = newPromo.findOne(node => node.name === "Copyright" && node.type === "TEXT") as TextNode;

  // Replace text
  if (templateHeader) templateHeader.characters = pluginMessage.header;
  if (templateCTA1) templateCTA1.characters = pluginMessage.cta1;
  if (templateCTA2) templateCTA2.characters = pluginMessage.cta2;
  if (templateSubtext) templateSubtext.characters = pluginMessage.subtext;
  if (templatePretext) templatePretext.characters = pluginMessage.pretext;
  if (templateCopyright) templateCopyright.characters = pluginMessage.copyright;

  // Change text and background fills
  changeAssetFillColor(newPromo, pluginMessage.backgroundColor);
  adaTextFill(templateHeader, pluginMessage);
  adaTextFill(templateCTA1, pluginMessage);
  adaTextFill(templateCTA2, pluginMessage);
  adaTextFill(templateSubtext, pluginMessage);
  adaTextFill(templatePretext, pluginMessage);
  adaTextFill(templateCopyright, pluginMessage);
  if (pluginMessage.backgroundColor === "blue") changeCTAVectorsColor();

  // Scroll and zoom into view
  figma.viewport.scrollAndZoomIntoView(nodes);
}