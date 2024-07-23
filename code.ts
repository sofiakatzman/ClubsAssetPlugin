figma.showUI(__html__);
figma.ui.resize(600, 600);

let currentY = 0;
let currentX = 0;

// Define the interface for plugin message
interface PluginMessage {
  header: string;
  cta1: string;
  cta2: string;
  subtext: string;
  pretext: string;
  copyright: string;
  backgroundColor: string;
  fullSelected?: boolean;
  fullVariant?: string;
  halfSelected?: boolean;
  halfVariant?: string;
  searchSelected?: boolean;
  searchVariant?: string;
  collectionSelected?: boolean;
  collectionVariant?: string;
  collectionMobileSelected?: boolean;
  collectionMobileVariant?: string;
  squareSelected?: boolean;
  squareVariant?: string;
  fullBackgroundOnly?: boolean;
  halfBackgroundOnly?: boolean;
  searchBackgroundOnly?: boolean;
  collectionBackgroundOnly?: boolean;
  collectionMobileBackgroundOnly?: boolean;
  squareBackgroundOnly?: boolean;
}

// Define a helper function to load fonts and handle errors
async function loadFonts() {
  const requiredFonts = [
    { family: "Filson Pro", style: "Bold" },
    { family: "Brandon Text", style: "Bold" },
    { family: "Brandon Text", style: "Regular" },
    { family: "Take Note", style: "Regular" }
  ];

  try {
    // Load all fonts asynchronously
    await Promise.all(requiredFonts.map(async font => {
      try {
        await figma.loadFontAsync(font);
      } catch (error) {
        // Handle font loading error
        console.error(`Failed to load font ${font.family} ${font.style}:`, error);
        figma.notify(`Failed to load font ${font.family} ${font.style}. Please reinstall it to continue, or reach out to Sofia Katzman`);
          
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
                  <p>Please reinstall fonts using the files in this <a href="https://drive.google.com/drive/folders/1Z3MtBR4LLx7Xv28VeMNCtgfvdKevDLZT" target="_blank">Google Drive folder</a>.</p>  
                  <p>If the font is already installed, please uninstall it, reinstall using the Google Drive link above and then restart your workstation.</p>
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
  }
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

  const color = colorMap[colorName.toLowerCase()];

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
    changeCTAVectorsColor() 
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

// Define a helper function to handle asset generation for background only versions of component sets
function generateBackgroundOnlyAsset(componentName: string, bgcolor: string) {
  const component = figma.root.findOne(node => node.type === "COMPONENT" && node.name === componentName) as ComponentNode;

  if (component) {
    const instance = component.createInstance();
    figma.currentPage.appendChild(instance);
    changeAssetFillColor(instance, bgcolor);

    instance.x = 1300;
    instance.y = currentY

    console.log("Finished generating background only asset!");
  } else {
    console.error(`Component "${componentName}" not found.`);
  }
}

// Define a helper function to handle asset generation for each component set
async function generateAsset(componentSet: ComponentSetNode | undefined, selectedVariant: string | undefined, variantMappings: { [key: string]: string }, pluginMessage: PluginMessage) {
  if (!componentSet) {
    console.error(`Component set not found.`);
    return;
  }

  if (!selectedVariant) {
    console.error(`No variant selected for ${componentSet.name}`);
    return;
  }

  const selectedComponent = componentSet.findOne(node => node.type === "COMPONENT" && node.name === variantMappings[selectedVariant]) as ComponentNode;

  if (!selectedComponent) {
    console.error(`No matching component found for ${selectedVariant} in ${componentSet.name}`);
    return;
  }

  const newPromo = selectedComponent.createInstance();
  const nodes: SceneNode[] = [newPromo];

  const templateHeader = newPromo.findOne(node => node.name === "Header" && node.type === "TEXT") as TextNode;
  const templateCTA1 = newPromo.findOne(node => node.name === "CTA1" && node.type === "TEXT") as TextNode;
  const templateCTA2 = newPromo.findOne(node => node.name === "CTA2" && node.type === "TEXT") as TextNode;
  const templateSubtext = newPromo.findOne(node => node.name === "Subtext" && node.type === "TEXT") as TextNode;
  const templatePretext = newPromo.findOne(node => node.name === "PreText" && node.type === "TEXT") as TextNode;
  const templateCopyright = newPromo.findOne(node => node.name === "Copyright" && node.type === "TEXT") as TextNode;

  if (templateHeader) templateHeader.characters = pluginMessage.header;
  if (templateCTA1) templateCTA1.characters = pluginMessage.cta1;
  if (templateCTA2) templateCTA2.characters = pluginMessage.cta2;
  if (templateSubtext) templateSubtext.characters = pluginMessage.subtext;
  if (templatePretext) templatePretext.characters = pluginMessage.pretext;
  if (templateCopyright) templateCopyright.characters = pluginMessage.copyright;

  changeAssetFillColor(newPromo, pluginMessage.backgroundColor);
  adaTextFill(templateHeader, pluginMessage);
  adaTextFill(templateCTA1, pluginMessage);
  adaTextFill(templateCTA2, pluginMessage);
  adaTextFill(templateSubtext, pluginMessage);
  adaTextFill(templatePretext, pluginMessage);
  adaTextFill(templateCopyright, pluginMessage);
  if (pluginMessage.backgroundColor === "blue") changeCTAVectorsColor();

  // position each asset 50px apart on y axis using their height 
  nodes.forEach((node, index) => {
    // place node at currentY axis
    node.y = currentY;

    // Append node to current page
    figma.currentPage.appendChild(node);

    // Increment currentY for the next node
    currentY += node.height + 50; 

});
figma.viewport.scrollAndZoomIntoView(nodes);
figma.currentPage.selection = nodes;
}

// Load all pages and set up message handler
figma.loadAllPagesAsync().then(() => {
  figma.ui.onmessage = async (pluginMessage: PluginMessage) => {
    console.log("Received message:", pluginMessage);

    await loadFonts();

    // Full Size Banner
    await generateAsset(figma.root.findOne(node => node.type === "COMPONENT_SET" && node.name === "Full Size Banner - Short") as ComponentSetNode, pluginMessage.fullVariant, {
      "fs-header-only": "CTA=No, CTA QTY=0, PreText=No, SubText=No",
      "fs-header-subtext": "CTA=No, CTA QTY=0, PreText=No, SubText=Yes",
      "fs-header-cta1": "CTA=Yes, CTA QTY=1, PreText=No, SubText=No",
      "fs-header-cta2": "CTA=Yes, CTA QTY=2, PreText=No, SubText=No"
    }, pluginMessage);
    if (pluginMessage.fullBackgroundOnly)generateBackgroundOnlyAsset("Full Size Banner - Short (Background Only)", pluginMessage.backgroundColor)


    // Half Size Banner
    await generateAsset(figma.root.findOne(node => node.type === "COMPONENT_SET" && node.name === "Half Size Banner") as ComponentSetNode, pluginMessage.halfVariant, {
      "hs-header-only": "CTA=No, PreText=No, SubText=No",
      "hs-header-subtext": "CTA=No, PreText=No, SubText=Yes",
      "hs-header-cta1": "CTA=Yes, PreText=No, SubText=No",
      "hs-header-subtext-cta1": "CTA=Yes, PreText=No, SubText=Yes",
      "hs-header-pretext-cta1": "CTA=Yes, PreText=Yes, SubText=No"
    }, pluginMessage);
    if (pluginMessage.halfBackgroundOnly)generateBackgroundOnlyAsset("Half Size Banner (Background Only)", pluginMessage.backgroundColor)


    // Search Results Banner - Desktop
    await generateAsset(figma.root.findOne(node => node.type === "COMPONENT_SET" && node.name === "Search Results Banner - Desktop") as ComponentSetNode, pluginMessage.searchVariant, {
      "sr-header-only": "CTA=No, CTA QTY=0, PreText=No, SubText=No",
      "sr-header-subtext": "CTA=No, CTA QTY=0, PreText=No, SubText=Yes",
      "sr-header-cta1": "CTA=Yes, CTA QTY=1, PreText=No, SubText=No",
      "sr-header-cta2": "CTA=Yes, CTA QTY=2, PreText=No, SubText=No",
      "sr-header-pretext-cta1": "CTA=Yes, CTA QTY=1, PreText=Yes, SubText=No",
      "sr-header-pretext-cta2": "CTA=Yes, CTA QTY=2, PreText=Yes, SubText=No"
    }, pluginMessage);
    if (pluginMessage.searchBackgroundOnly)generateBackgroundOnlyAsset("Search Results Banner - Desktop (Background Only)", pluginMessage.backgroundColor)


    // Collection Page Hero - Desktop
    await generateAsset(figma.root.findOne(node => node.type === "COMPONENT_SET" && node.name === "Collection Page Hero - Desktop") as ComponentSetNode, pluginMessage.collectionVariant, {
      "cp-header-only": "CTA=No, CTA QTY=0, PreText=No, SubText=No",
      "cp-header-subtext": "CTA=No, CTA QTY=0, PreText=No, SubText=Yes",
      "cp-header-cta1": "CTA=Yes, CTA QTY=1, PreText=No, SubText=No",
      "cp-header-cta2": "CTA=Yes, CTA QTY=2, PreText=No, SubText=No",
      "cp-header-pretext-cta1": "CTA=Yes, CTA QTY=1, PreText=Yes, SubText=No",
      "cp-header-pretext-cta2": "CTA=Yes, CTA QTY=2, PreText=Yes, SubText=No"
    }, pluginMessage);
    if (pluginMessage.collectionBackgroundOnly)generateBackgroundOnlyAsset("Collection Page Hero - Desktop (Background Only)", pluginMessage.backgroundColor)


    // Collection Page Hero - Mobile
    await generateAsset(figma.root.findOne(node => node.type === "COMPONENT_SET" && node.name === "Collection Page Hero - Mobile") as ComponentSetNode, pluginMessage.collectionMobileVariant, {
      "cpm-header-only": "CTA=No, CTA QTY=0, PreText=No, SubText=No",
      "cpm-header-subtext": "CTA=No, CTA QTY=0, PreText=No, SubText=Yes",
      "cpm-header-cta1": "CTA=Yes, CTA QTY=1, PreText=No, SubText=No",
      "cpm-header-cta2": "CTA=Yes, CTA QTY=2, PreText=No, SubText=No",
      "cpm-header-pretext-cta1": "CTA=Yes, CTA QTY=1, PreText=Yes, SubText=No",
      "cpm-header-pretext-cta2": "CTA=Yes, CTA QTY=2, PreText=Yes, SubText=No",
      "cpm-header-subtext-cta1": "CTA=Yes, CTA QTY=1, PreText=No, SubText=Yes",
      "cpm-header-subtext-cta2": "CTA=Yes, CTA QTY=2, PreText=No, SubText=Yes"
    }, pluginMessage);
    if (pluginMessage.collectionMobileBackgroundOnly)generateBackgroundOnlyAsset("Collection Page Hero - Mobile (Background Only)", pluginMessage.backgroundColor)


    // Square Banner
    await generateAsset(figma.root.findOne(node => node.type === "COMPONENT_SET" && node.name === "Square") as ComponentSetNode, pluginMessage.squareVariant, {
      "sq-header-only": "CTA=No, PreText=No, SubText=No",
      "sq-header-cta1": "CTA=Yes, PreText=No, SubText=No",
      "sq-header-pretext-cta1": "CTA=Yes, PreText=Yes, SubText=No",
      "sq-header-subtext-cta1": "CTA=Yes, PreText=No, SubText=Yes",
      "sq-header-subtext": "CTA=No, PreText=No, SubText=Yes",
    }, pluginMessage);
    if (pluginMessage.squareBackgroundOnly)generateBackgroundOnlyAsset("Square (Background Only)", pluginMessage.backgroundColor)
    
    console.log("Finished generating assets.");
    figma.closePlugin();
  };
}); 