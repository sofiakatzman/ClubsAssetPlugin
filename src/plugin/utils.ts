const AIRTABLEAPIKEY = process.env.AIRTABLE_API_KEY;
// let generatedAssets: SceneNode[] = [];
let currentY = 0;
loadFonts() 
// Function to clear the existing assets and create a new auto layout container
// export function createAutoLayoutContainer() {
//   // Remove previous container if it exists
//   const existingContainer = figma.root.findOne(node => node.name === "Generated Assets Container" && node.type === "FRAME") as FrameNode;
//   if (existingContainer) {
//     existingContainer.remove();
//   }

//   // Create a new frame with auto layout
//   const container = figma.createFrame();
//   container.name = "Generated Assets Container";
//   container.layoutMode = "VERTICAL"; // or "HORIZONTAL" depending on your needs
//   container.primaryAxisAlignItems = "MIN"; // Adjust alignment as needed
//   container.counterAxisAlignItems = "CENTER"; // Adjust alignment as needed
//   container.paddingLeft = 20;
//   container.paddingRight = 20;
//   container.paddingTop = 20;
//   container.paddingBottom = 20;
//   container.itemSpacing = 10;

// // Add all generated assets to the container
// generatedAssets.forEach(asset => {
//   // Remove asset from its previous parent
//   if (asset.parent) {
//     asset.remove();
//   }

//   figma.viewport.scrollAndZoomIntoView([container]);
//   // Append asset to the container
//   container.appendChild(asset);
// });

//   // Center the viewport on the new container
//   figma.viewport.scrollAndZoomIntoView([container]);

//   // Reset the global array
//   generatedAssets = [];
// }

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
          let variantMapping = asset.fields.Layout
          // process half size
          if(asset.fields.Type === "Half Size Banner" && asset.fields.Layout==="Header Only"){
            variantMapping = "CTA=No, PreText=No, SubText=No"
          } else if(asset.fields.Type === "Half Size Banner" && asset.fields.Layout==="Header and Subtext"){
            variantMapping = "CTA=No, PreText=No, SubText=Yes"
          } else if(asset.fields.Type === "Half Size Banner" && asset.fields.Layout==="Header and Single CTA"){
            variantMapping = "CTA=Yes, PreText=No, SubText=No"
          } else if(asset.fields.Type === "Half Size Banner" && asset.fields.Layout==="Header, CTA and Subtext"){
           variantMapping = "CTA=Yes, PreText=No, SubText=Yes"
          } else if(asset.fields.Type === "Half Size Banner" && asset.fields.Layout==="Header, CTA and Pretext"){
            variantMapping = "CTA=Yes, PreText=Yes, SubText=No"
          }

          //process full size banner - short
          if (asset.fields.Type === "Full Size Banner - Short" && asset.fields.Layout === "Header Only") {
            variantMapping = "CTA=No, CTA QTY=0, PreText=No, SubText=No";
          } else if (asset.fields.Type === "Full Size Banner - Short" && asset.fields.Layout === "Header and Subtext") {
              variantMapping = "CTA=No, CTA QTY=0, PreText=No, SubText=Yes";
          } else if (asset.fields.Type === "Full Size Banner - Short" && asset.fields.Layout === "Header and Single CTA") {
              variantMapping = "CTA=Yes, CTA QTY=1, PreText=No, SubText=No";
          } else if (asset.fields.Type === "Full Size Banner - Short" && asset.fields.Layout === "Header and Double CTA") {
              variantMapping = "CTA=Yes, CTA QTY=2, PreText=No, SubText=No";
          }

          //process search results desktop
          if (asset.fields.Type === "Search Results Banner - Desktop" && asset.fields.Layout === "Header Only") {
            variantMapping = "CTA=No, CTA QTY=0, PreText=No, SubText=No";
          } else if (asset.fields.Type === "Search Results Banner - Desktop" && asset.fields.Layout === "Header and Subtext") {
              variantMapping = "CTA=No, CTA QTY=0, PreText=No, SubText=Yes";
          } else if (asset.fields.Type === "Search Results Banner - Desktop" && asset.fields.Layout === "Header and Single CTA") {
              variantMapping = "CTA=Yes, CTA QTY=1, PreText=No, SubText=No";
          } else if (asset.fields.Type === "Search Results Banner - Desktop" && asset.fields.Layout === "Header and Double CTA") {
              variantMapping = "CTA=Yes, CTA QTY=2, PreText=No, SubText=No";
          } else if (asset.fields.Type === "Search Results Banner - Desktop" && asset.fields.Layout === "Header, Pretext and Single CTA") {
              variantMapping = "CTA=Yes, CTA QTY=1, PreText=Yes, SubText=No";
          } else if (asset.fields.Type === "Search Results Banner - Desktop" && asset.fields.Layout === "Header, Pretext and Double CTA") {
              variantMapping = "CTA=Yes, CTA QTY=2, PreText=Yes, SubText=No";
          }

          //process collection page hero - desktop
          if (asset.fields.Type === "Collection Page Hero - Desktop" && asset.fields.Layout === "Header Only") {
              variantMapping = "CTA=No, CTA QTY=0, PreText=No, SubText=No";
          } else if (asset.fields.Type === "Collection Page Hero - Desktop" && asset.fields.Layout === "Header and Subtext") {
              variantMapping = "CTA=No, CTA QTY=0, PreText=No, SubText=Yes";
          } else if (asset.fields.Type === "Collection Page Hero - Desktop" && asset.fields.Layout === "Header and Single CTA") {
              variantMapping = "CTA=Yes, CTA QTY=1, PreText=No, SubText=No";
          } else if (asset.fields.Type === "Collection Page Hero - Desktop" && asset.fields.Layout === "Header and Double CTA") {
              variantMapping = "CTA=Yes, CTA QTY=2, PreText=No, SubText=No";
          } else if (asset.fields.Type === "Collection Page Hero - Desktop" && asset.fields.Layout === "Header, Pretext and Single CTA") {
              variantMapping = "CTA=Yes, CTA QTY=1, PreText=Yes, SubText=No";
          }

          //process collection page hero - mobile
          if (asset.fields.Type === "Collection Page Hero - Mobile" && asset.fields.Layout === "Header Only") {
            variantMapping = "CTA=No, CTA QTY=0, PreText=No, SubText=No";
          } else if (asset.fields.Type === "Collection Page Hero - Mobile" && asset.fields.Layout === "Header and Subtext") {
              variantMapping = "CTA=No, CTA QTY=0, PreText=No, SubText=Yes";
          } else if (asset.fields.Type === "Collection Page Hero - Mobile" && asset.fields.Layout === "Header and Single CTA") {
              variantMapping = "CTA=Yes, CTA QTY=1, PreText=No, SubText=No";
          } else if (asset.fields.Type === "Collection Page Hero - Mobile" && asset.fields.Layout === "Header and Double CTA") {
              variantMapping = "CTA=Yes, CTA QTY=2, PreText=No, SubText=No";
          } else if (asset.fields.Type === "Collection Page Hero - Mobile" && asset.fields.Layout === "Header, Pretext and Single CTA") {
              variantMapping = "CTA=Yes, CTA QTY=1, PreText=Yes, SubText=No";
          } else if (asset.fields.Type === "Collection Page Hero - Mobile" && asset.fields.Layout === "Header, Subtext and Single CTA") {
              variantMapping = "CTA=Yes, CTA QTY=1, PreText=No, SubText=Yes";
          } else if (asset.fields.Type === "Collection Page Hero - Mobile" && asset.fields.Layout === "Header, Subtext and Double CTA") {
              variantMapping = "CTA=Yes, CTA QTY=2, PreText=No, SubText=Yes";
          }

          //process square
          if (asset.fields.Type === "Square" && asset.fields.Layout === "Header Only") {
            variantMapping = "CTA=No, PreText=No, SubText=No";
          } else if (asset.fields.Type === "Square" && asset.fields.Layout === "Header and Subtext") {
              variantMapping = "CTA=No, PreText=No, SubText=Yes";
          } else if (asset.fields.Type === "Square" && asset.fields.Layout === "Header and Single CTA") {
              variantMapping = "CTA=Yes, PreText=No, SubText=No";
          } else if (asset.fields.Type === "Square" && asset.fields.Layout === "Header, Subtext and Single CTA") {
              variantMapping = "CTA=Yes, PreText=No, SubText=Yes";
          } else if (asset.fields.Type === "Square" && asset.fields.Layout === "Header, Pretext and Single CTA") {
              variantMapping = "CTA=Yes, PreText=Yes, SubText=No";
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

          console.log("generating asset function execution is next - BookCover:")
          generateAsset(
            componentSet,
            asset.fields.Type, // selectedVariant
            variantMapping,
            {
              header: asset.fields.Title,
              cta1: asset.fields.CTA1,
              cta2: asset.fields.CTA2,
              subtext: asset.fields.SubText,
              pretext: asset.fields.PreText,
              copyright: asset.fields.Copyright,
              backgroundColor: asset.fields.BackgroundColor,
              bookCover: asset.fields.bookCover
            }
          );
        
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

// Define a helper function to change text color for ADA compliance - removing for now for sake of time - revisiting
// function adaTextFill(assetNode: TextNode, pluginMessage: PluginMessage) {
//   if (pluginMessage.backgroundColor == "blue") {
//     assetNode.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
//     console.log("Text changed to white to be ADA compliant!");
//     changeCTAVectorsColor();
//   }
// }

// Define a helper function to change CTA Vectors color
// function changeCTAVectorsColor() {
//   const ctaVectorNodes = figma.currentPage.findAll(node => node.type === 'VECTOR' && node.name === 'CTAVector') as VectorNode[];
//   if (ctaVectorNodes.length > 0) {
//     ctaVectorNodes.forEach(ctaVectorNode => {
//       ctaVectorNode.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
//     });
//     console.log("All CTAVectors changed to RGB181818!");
//   } else {
//     console.log("No CTAVectors found!");
//   }
// }

// Define a helper function to handle asset generation for each component set -> PREV WORKING FOR AIRTABLE!!!! <-----------------~~~~~~
async function generateAsset(componentSet: ComponentSetNode | undefined, selectedVariant: string | undefined, variantMapping: string, pluginMessage: PluginMessage) {
  // Error if no components found

  await loadFonts();
  console.log(pluginMessage)
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
  
  console.log(nodes)
  // generatedAssets.push(newPromo);

  nodes.forEach(node => {
    console.log("this is your bookcover URL:")
    console.log(pluginMessage.bookCover)
    // fillBookCoverWithColor(node)
    getBookCover(newPromo, pluginMessage.bookCover)
    node.y = currentY;

    // Append node to the current page
    figma.currentPage.appendChild(node);

    // Increment currentY for the next node
    currentY += node.height + 50; 

    console.log("Asset positioned at Y: " + currentY);
  });

  // Center the viewport on the new nodes
  figma.viewport.scrollAndZoomIntoView(nodes);
  figma.currentPage.selection = nodes;


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
  // adaTextFill(templateHeader, pluginMessage);
  // adaTextFill(templateCTA1, pluginMessage);
  // adaTextFill(templateCTA2, pluginMessage);``
  // adaTextFill(templateSubtext, pluginMessage);
  // adaTextFill(templatePretext, pluginMessage);
  // adaTextFill(templateCopyright, pluginMessage);
  // if (pluginMessage.backgroundColor == "blue") changeCTAVectorsColor();
  // changeCTAVectorsColor();
  // Scroll and zoom into view
}

/**
 * Recursively searches for a frame with the specified name within a node.
 * @param node - The node to search within.
 * @param frameName - The name of the frame to find.
 * @returns The found frame, or null if not found.
 */
function findFrameByName(node: SceneNode, frameName: string): FrameNode | null {
  // If the node is a frame and matches the name, return it
  if (node.type === 'FRAME' && node.name === frameName) {
    return node as FrameNode;
  }

  // Handle nodes that might contain children
  if ((node as any).children && Array.isArray((node as any).children)) {
    for (const child of (node as any).children) {
      const result = findFrameByName(child, frameName);
      if (result) {
        return result;
      }
    }
  }

  // Return null if not found
  return null;
}

// /**
//  * Fills the `BOOKCOVER` frame inside a given node with a solid color.
//  * @param parentNode - The parent node containing the `BOOKCOVER` frame.
//  */
// function fillBookCoverWithColor(parentNode: SceneNode) {
//   // Find the `BOOKCOVER` frame
//   const bookCoverFrame = findFrameByName(parentNode, 'BOOKCOVER');

//   if (!bookCoverFrame) {
//     console.error('BOOKCOVER frame not found inside the parent node.');
//     return;
//   }

//   // Apply the solid color fill to the frame
//   // bookCoverFrame.fills = [{
//   //   type: 'SOLID',
//   //   color: {
//   //     r: 1,
//   //     g: 1,
//   //     b: 1
//   //   }
//   // }];

// }

function getBookCover(parentNode: SceneNode, bookCover:string) {
  const url = bookCover;
  const bookCoverFrame = findFrameByName(parentNode, 'BOOKCOVER');
  if (!bookCoverFrame) {
    console.error('BOOKCOVER frame not found inside the parent node.');
    return;
  }

  // Fetch the image from the URL
  fetch(url)
    .then(response => response.arrayBuffer())
    .then(buffer => {
      // Create an image using the buffer
      const image = figma.createImage(new Uint8Array(buffer));

      // Set the image as a fill to the frame
      bookCoverFrame.fills = [
        {
          type: 'IMAGE',
          imageHash: image.hash,
          scaleMode: 'FIT'
        }
      ];

      figma.viewport.scrollAndZoomIntoView([bookCoverFrame]);
    })
    .catch(error => {
      figma.notify("Failed to load image: " + error);
    })
    .finally(() => {
      // figma.closePlugin();
      console.log('the end');
    });
}
export async function makeSeries(msg: any) {
  await loadFonts();
  console.log("Received message:", msg);

  const nodes: SceneNode[] = [];
  const componentSets = loadComponentSets();

  for (const key in msg) {
    if (msg.hasOwnProperty(key)) {
      const assetArray = msg[key];
      console.log(`Processing key: ${key}, assetArray:`, assetArray); // Debugging line

      if (Array.isArray(assetArray)) {
        for (const asset of assetArray) {
          console.log(`Processing asset:`, asset); // Debugging line
          const variationCode = getVariationCode(asset);
          if (variationCode) {
            asset.variation = variationCode;
            const selectedVariant = getVariant(componentSets, asset);

            if (selectedVariant) {
              const newPromo = selectedVariant.createInstance();
              const nodes: SceneNode[] = [newPromo];
              //stack all assets under eachother without overlap
              nodes.forEach(node => {
                node.y = currentY;
                
                // Append node to the current page
                figma.currentPage.appendChild(node);
            
                // Increment currentY for the next node
                currentY += node.height + 50; 

              });
            
              // Center the viewport on the new nodes
              figma.viewport.scrollAndZoomIntoView(nodes);
              figma.currentPage.selection = nodes;

          
              if (asset.copy && typeof asset.copy === 'object') {
                applyTextContent(newPromo, asset.copy);
              } else {
                console.error("Error: The copy field is not an object or is missing.");
              }

              if (asset.backgroundColor) {
                changeAssetFillColor(newPromo, asset.backgroundColor);
              }
            } else {
              console.error(`No matching component found for ${asset.type} - ${asset.variation}`);
            }
          } else {
            console.error(`No matching variation code found for ${asset.type} - ${asset.variation}`);
          }
        }
      } else {
        console.error(`Error: Expected an array for ${key}, but got ${typeof assetArray}.`);
      }
    }
  }

  figma.viewport.scrollAndZoomIntoView(nodes);
}

function loadComponentSets() {
  return {
    "Full Size Banner - Short": figma.root.findOne(node => node.type === "COMPONENT_SET" && node.name === "Full Size Banner - Short") as ComponentSetNode,
    "Half Size Banner": figma.root.findOne(node => node.type === "COMPONENT_SET" && node.name === "Half Size Banner") as ComponentSetNode,
    "Search Results Banner - Desktop": figma.root.findOne(node => node.type === "COMPONENT_SET" && node.name === "Search Results Banner - Desktop") as ComponentSetNode,
    "Collection Page Hero - Desktop": figma.root.findOne(node => node.type === "COMPONENT_SET" && node.name === "Collection Page Hero - Desktop") as ComponentSetNode,
    "Collection Page Hero - Mobile": figma.root.findOne(node => node.type === "COMPONENT_SET" && node.name === "Collection Page Hero - Mobile") as ComponentSetNode,
    "Square": figma.root.findOne(node => node.type === "COMPONENT_SET" && node.name === "Square") as ComponentSetNode
  };
}

function getVariant(componentSets: any, asset: any) {
  const { type, variation } = asset;
  const componentSet = componentSets[type];
  if (!componentSet) {
    console.error(`Component set for ${type} not found`);
    return null;
  }

  // Get the component variant based on the variation code
  return componentSet.findOne(node => node.type === "COMPONENT" && node.name.includes(variation));
}

function applyTextContent(promo: InstanceNode, copy: any) {
  if (typeof copy !== 'object') {
    console.error("Error: The copy provided is not an object.");
    return;
  }

  const { header, subtext, cta1, cta2, pretext } = copy;
  const textFields = {
    "Header": header,
    "Subtext": subtext,
    "CTA1": cta1,
    "CTA2": cta2,
    "PreText": pretext
  };

  for (const [fieldName, content] of Object.entries(textFields)) {
    const textNode = promo.findOne(node => node.name === fieldName && node.type === "TEXT") as TextNode;
    if (textNode && content !== undefined) {
      textNode.characters = content || "";
    }
  }
}

function getVariationCode(asset: any): string | null {
  const { variation, type } = asset;

  switch (type) {
    case "Full Size Banner - Short":
      switch (variation) {
        case "Header Only":
          return "CTA=No, CTA QTY=0, PreText=No, SubText=No";
        case "Header and Subtext":
          return "CTA=No, CTA QTY=0, PreText=No, SubText=Yes";
        case "Header and Single CTA":
          return "CTA=Yes, CTA QTY=1, PreText=No, SubText=No";
        case "Header and Double CTA":
          return "CTA=Yes, CTA QTY=2, PreText=No, SubText=No";
        default:
          return null;
      }
    case "Half Size Banner":
      switch (variation) {
        case "Header Only":
          return "CTA=No, PreText=No, SubText=No";
        case "Header and Subtext":
          return "CTA=No, PreText=No, SubText=Yes";
        case "Header and Single CTA":
          return "CTA=Yes, PreText=No, SubText=No";
        case "Header, Subtext and Single CTA":
          return "CTA=Yes, PreText=No, SubText=Yes";
        case "Header, Pretext and Single CTA":
          return "CTA=Yes, PreText=Yes, SubText=No";
        default:
          return null;
      }
      case "Search Results Banner - Desktop":
      switch (variation) {
        case "Header Only":
          return "CTA=No, CTA QTY=0, PreText=No, SubText=No";
        case "Header and Subtext":
          return "CTA=No, CTA QTY=0, PreText=No, SubText=Yes";
        case "Header and Single CTA":
          return "CTA=Yes, CTA QTY=1, PreText=No, SubText=No";
        case "Header and Double CTA":
          return "CTA=Yes, CTA QTY=2, PreText=No, SubText=No";
        case "Header, Pretext and Single CTA":
          return "CTA=Yes, CTA QTY=1, PreText=Yes, SubText=No";
        case "Header, Pretext and Double CTA":
          return "CTA=Yes, CTA QTY=2, PreText=Yes, SubText=No";
        default:
          return null;
      }
    case "Collection Page Hero - Desktop":
      switch (variation) {
        case "Header Only":
          return "CTA=No, CTA QTY=0, PreText=No, SubText=No";
        case "Header and Subtext":
          return "CTA=No, CTA QTY=0, PreText=No, SubText=Yes";
        case "Header and Single CTA":
          return "CTA=Yes, CTA QTY=1, PreText=No, SubText=No";
        case "Header and Double CTA":
          return "CTA=Yes, CTA QTY=2, PreText=No, SubText=No";
        case "Header, Pretext and Single CTA":
          return "CTA=Yes, CTA QTY=1, PreText=Yes, SubText=No";
        case "Header, Pretext and Double CTA":
          return "CTA=Yes, CTA QTY=2, PreText=Yes, SubText=No";
        default:
          return null;
      }
    case "Collection Page Hero - Mobile":
      switch (variation) {
        case "Header Only":
          return "CTA=No, CTA QTY=0, PreText=No, SubText=No";
        case "Header and Subtext":
          return "CTA=No, CTA QTY=0, PreText=No, SubText=Yes";
        case "Header and Single CTA":
          return "CTA=Yes, CTA QTY=1, PreText=No, SubText=No";
        case "Header and Double CTA":
          return "CTA=Yes, CTA QTY=2, PreText=No, SubText=No";
        case "Header, Pretext and Single CTA":
          return "CTA=Yes, CTA QTY=1, PreText=Yes, SubText=No";
        case "Header, Subtext and Single CTA":
          return "CTA=Yes, CTA QTY=1, PreText=No, SubText=Yes";
        case "Header, Subtext and Double CTA":
          return "CTA=Yes, CTA QTY=2, PreText=No, SubText=Yes";
        default:
          return null;
      }


    case "Square":
      switch (variation) {
        case "Header Only":
          return "CTA=No, PreText=No, SubText=No";
        case "Header and Subtext":
          return "CTA=No, PreText=No, SubText=Yes";
        case "Header and Single CTA":
          return "CTA=Yes, PreText=No, SubText=No";
        case "Header, Subtext and Single CTA":
          return "CTA=Yes, PreText=No, SubText=Yes";
        case "Header, Pretext and Single CTA":
          return "CTA=Yes, PreText=Yes, SubText=No";
        default:
          return null;
      }
    default:
      return null;
  }
}