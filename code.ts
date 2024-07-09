figma.showUI(__html__);
figma.ui.resize(500, 900);

figma.loadAllPagesAsync().then(() => {
  figma.ui.onmessage = async pluginMessage => {
    console.log("Received message:", pluginMessage);
    const nodes: SceneNode[] = [];
    const fullSizeComponentSet = figma.root.findOne(node => node.type === "COMPONENT_SET" && node.name === "Full Size Test") as ComponentSetNode;
    const halfSizeComponentSet = figma.root.findOne(node => node.type === "COMPONENT_SET" && node.name === "Half Size Test") as ComponentSetNode;
    const searchResultsComponentSet = figma.root.findOne(node => node.type === "COMPONENT_SET" && node.name === "Search Results Test") as ComponentSetNode;
    const curatedWebComponentSet = figma.root.findOne(node => node.type === "COMPONENT_SET" && node.name === "Curated Page Web Test") as ComponentSetNode;
    let selectedFullVariant;
    let selectedHalfVariant;
    let selectedSearchVariant;
    let selectedCuratedWebVariant;

    // Load fonts
    await figma.loadFontAsync({ family: "Filson Pro", style: "Bold" });
    await figma.loadFontAsync({ family: "Brandon Text", style: "Bold" });
    await figma.loadFontAsync({ family: "Brandon Text", style: "Regular" });
    await figma.loadFontAsync({ family: "Take Note", style: "Regular" });

    
    //**************************************** FULL SIZE - ASSET GENERATION LOGIC ****************************************//
    // check that a full size component was found on figma (template for generated asset)
    if (fullSizeComponentSet) {
      console.log("Found fullSizeComponentSet:", fullSizeComponentSet);

      // check if full size promo is selected, if it is, then find the selected variant
      if (pluginMessage.fullSelected === true) {
        switch (pluginMessage.fullVariant) {
          case "fs-header-only":
            selectedFullVariant = fullSizeComponentSet.findOne(node => node.type === "COMPONENT" && node.name === "CTA=No, CTA QTY=0, PreText=No, SubText=No, With Image=False, Discount Code=False") as ComponentNode;
            break;
          case "fs-header-subtext":
            selectedFullVariant = fullSizeComponentSet.findOne(node => node.type === "COMPONENT" && node.name === "CTA=No, CTA QTY=0, PreText=No, SubText=Yes, With Image=False, Discount Code=False") as ComponentNode;
            break;
          case "fs-header-cta1":
            selectedFullVariant = fullSizeComponentSet.findOne(node => node.type === "COMPONENT" && node.name === "CTA=Yes, CTA QTY=1, PreText=No, SubText=No, With Image=False, Discount Code=False") as ComponentNode;
            break;
          case "fs-header-cta2":
            selectedFullVariant = fullSizeComponentSet.findOne(node => node.type === "COMPONENT" && node.name === "CTA=Yes, CTA QTY=2, PreText=No, SubText=No, With Image=False, Discount Code=False") as ComponentNode;
            break;
        }

        if (selectedFullVariant) {
          console.log("Found selectedFullVariant:", selectedFullVariant);
          // Create an instance based on the selected variant
          const newFullPromo = selectedFullVariant.createInstance();
          nodes.push(newFullPromo);

          // Find text fields in the new instance
          const templateHeader = newFullPromo.findOne(node => node.name === "Header" && node.type === "TEXT") as TextNode;
          const templateCTA1 = newFullPromo.findOne(node => node.name === "CTA1" && node.type === "TEXT") as TextNode;
          const templateCTA2 = newFullPromo.findOne(node => node.name === "CTA2" && node.type === "TEXT") as TextNode;
          const templateSubtext = newFullPromo.findOne(node => node.name === "Subtext" && node.type === "TEXT") as TextNode;
          const templatePretext = newFullPromo.findOne(node => node.name === "PreText" && node.type === "TEXT") as TextNode;
          const templateCopyright = newFullPromo.findOne(node => node.name === "Copyright" && node.type === "TEXT") as TextNode;

          // console.log("before assignment testing")
          // console.log(templateHeader.characters)
          // console.log(templateCTA1.characters)
          // console.log(templateCTA2.characters)
          // console.log(templateSubtext.characters)
          // console.log(templatePretext.characters)
          // console.log(templateCopyright.characters)

          // Replace text of new instances
          if (templateHeader) templateHeader.characters = pluginMessage.header;
          if (templateCTA1) templateCTA1.characters = pluginMessage.cta1;
          if (templateCTA2) templateCTA2.characters = pluginMessage.cta2;
          if (templateSubtext) templateSubtext.characters = pluginMessage.subtext;
          if (templatePretext) templatePretext.characters = pluginMessage.pretext;
          if (templateCopyright) templateCopyright.characters = pluginMessage.copyright;

          // console.log("post assignment testing")
          // if(templateHeader) console.log(templateHeader.characters)
          // if(templateCTA1) console.log(templateCTA1.characters)
          // if(templateCTA2) console.log(templateCTA2.characters)
          // if(templateSubtext) console.log(templateSubtext.characters)
          // if(templatePretext) console.log(templatePretext.characters)
          // if(templateCopyright) console.log(templateCopyright.characters)
          figma.viewport.scrollAndZoomIntoView(nodes);
        } else {
          console.error("No matching component found for the given criteria.");
        }
      }
    } else {
      console.error("Component set with the name 'Full Size' not found");
    }

    //**************************************** HALF SIZE - ASSET GENERATION LOGIC ****************************************//
    // check that a half size component was found on figma (template for generated asset)
    if (halfSizeComponentSet) {
      console.log("Found halfSizeComponentSet:", halfSizeComponentSet);

      // check if half size promo is selected, if it is, then find the selected variant
      if (pluginMessage.halfSelected === true) {
        switch (pluginMessage.halfVariant) {
          case "hs-header-only":
            selectedHalfVariant = halfSizeComponentSet.findOne(node => node.type === "COMPONENT" && node.name === "CTA=No, PreText=No, SubText=No") as ComponentNode;
            break;
          case "hs-header-subtext":
            selectedHalfVariant = halfSizeComponentSet.findOne(node => node.type === "COMPONENT" && node.name === "CTA=No, PreText=No, SubText=Yes") as ComponentNode;
            break;
          case "hs-header-cta1":
            selectedHalfVariant = halfSizeComponentSet.findOne(node => node.type === "COMPONENT" && node.name === "CTA=Yes, PreText=No, SubText=No") as ComponentNode;
            break;
          case "hs-header-subtext-cta1":
            selectedHalfVariant = halfSizeComponentSet.findOne(node => node.type === "COMPONENT" && node.name === "CTA=Yes, PreText=No, SubText=Yes") as ComponentNode;
            break;
          case "hs-header-pretext-cta1":
            selectedHalfVariant = halfSizeComponentSet.findOne(node => node.type === "COMPONENT" && node.name === "CTA=Yes, PreText=Yes, SubText=No") as ComponentNode;
            break;        
          }

        if (selectedHalfVariant) {
          console.log("Found selectedFullVariant:", selectedFullVariant);
          // Create an instance based on the selected variant
          const newHalfPromo = selectedHalfVariant.createInstance();
          nodes.push(newHalfPromo);

          // Find text fields in the new instance
          const templateHeader = newHalfPromo.findOne(node => node.name === "Header" && node.type === "TEXT") as TextNode;
          const templateCTA1 = newHalfPromo.findOne(node => node.name === "CTA1" && node.type === "TEXT") as TextNode;
          const templateCTA2 = newHalfPromo.findOne(node => node.name === "CTA2" && node.type === "TEXT") as TextNode;
          const templateSubtext = newHalfPromo.findOne(node => node.name === "Subtext" && node.type === "TEXT") as TextNode;
          const templatePretext = newHalfPromo.findOne(node => node.name === "PreText" && node.type === "TEXT") as TextNode;
          const templateCopyright = newHalfPromo.findOne(node => node.name === "Copyright" && node.type === "TEXT") as TextNode;

          // console.log("before assignment testing")
          // console.log(templateHeader.characters)
          // console.log(templateCTA1.characters)
          // console.log(templateCTA2.characters)
          // console.log(templateSubtext.characters)
          // console.log(templatePretext.characters)
          // console.log(templateCopyright.characters)

          // Replace text of new instances
          if (templateHeader) templateHeader.characters = pluginMessage.header;
          if (templateCTA1) templateCTA1.characters = pluginMessage.cta1;
          if (templateCTA2) templateCTA2.characters = pluginMessage.cta2;
          if (templateSubtext) templateSubtext.characters = pluginMessage.subtext;
          if (templatePretext) templatePretext.characters = pluginMessage.pretext;
          if (templateCopyright) templateCopyright.characters = pluginMessage.copyright;

          // console.log("post assignment testing")
          // if(templateHeader) console.log(templateHeader.characters)
          // if(templateCTA1) console.log(templateCTA1.characters)
          // if(templateCTA2) console.log(templateCTA2.characters)
          // if(templateSubtext) console.log(templateSubtext.characters)
          // if(templatePretext) console.log(templatePretext.characters)
          // if(templateCopyright) console.log(templateCopyright.characters)
          figma.viewport.scrollAndZoomIntoView(nodes);
        } else {
          console.error("No matching component found for the given criteria.");
        }
      }
    } else {
      console.error("Component set with the name 'Half Size' not found");
    }

    //**************************************** SEARCH RESULTS - ASSET GENERATION LOGIC ****************************************//
    // check that a search results component was found on figma (template for generated asset)
    if (searchResultsComponentSet) {
      console.log("Found searchResultsComponentSet:", searchResultsComponentSet);

      // check if search results is selected, if it is, then find the selected variant
      if (pluginMessage.searchSelected === true) {
        switch (pluginMessage.searchVariant) {
          case "sr-header-only":
            selectedSearchVariant = searchResultsComponentSet.findOne(node => node.type === "COMPONENT" && node.name === "CTA=No, CTA QTY=0, PreText=No, SubText=No") as ComponentNode;
            break;
          case "sr-header-subtext":
            selectedSearchVariant = searchResultsComponentSet.findOne(node => node.type === "COMPONENT" && node.name === "CTA=No, CTA QTY=0, PreText=No, SubText=Yes") as ComponentNode;
            break;
          case "sr-header-cta1":
            selectedSearchVariant = searchResultsComponentSet.findOne(node => node.type === "COMPONENT" && node.name === "CTA=Yes, CTA QTY=1, PreText=No, SubText=No") as ComponentNode;
            break;
          case "sr-header-cta2":
            selectedSearchVariant = searchResultsComponentSet.findOne(node => node.type === "COMPONENT" && node.name === "CTA=Yes, CTA QTY=2, PreText=No, SubText=No") as ComponentNode;
            break;
          case "sr-header-pretext-cta1":
            selectedSearchVariant = searchResultsComponentSet.findOne(node => node.type === "COMPONENT" && node.name === "CTA=Yes, CTA QTY=1, PreText=Yes, SubText=No") as ComponentNode;
            break;
          case "sr-header-pretext-cta2":
            selectedSearchVariant = searchResultsComponentSet.findOne(node => node.type === "COMPONENT" && node.name === "CTA=Yes, CTA QTY=2, PreText=Yes, SubText=No") as ComponentNode;
            break;
        }

        if (selectedSearchVariant) {
          console.log("Found selectedSearchVariant:", selectedSearchVariant);
          // Create an instance based on the selected variant
          const newSearchPromo = selectedSearchVariant.createInstance();
          nodes.push(newSearchPromo);

          // Find text fields in the new instance
          const templateHeader = newSearchPromo.findOne(node => node.name === "Header" && node.type === "TEXT") as TextNode;
          const templateCTA1 = newSearchPromo.findOne(node => node.name === "CTA1" && node.type === "TEXT") as TextNode;
          const templateCTA2 = newSearchPromo.findOne(node => node.name === "CTA2" && node.type === "TEXT") as TextNode;
          const templateSubtext = newSearchPromo.findOne(node => node.name === "Subtext" && node.type === "TEXT") as TextNode;
          const templatePretext = newSearchPromo.findOne(node => node.name === "PreText" && node.type === "TEXT") as TextNode;
          const templateCopyright = newSearchPromo.findOne(node => node.name === "Copyright" && node.type === "TEXT") as TextNode;

          // Replace text of new instances
          if (templateHeader) templateHeader.characters = pluginMessage.header;
          if (templateCTA1) templateCTA1.characters = pluginMessage.cta1;
          if (templateCTA2) templateCTA2.characters = pluginMessage.cta2;
          if (templateSubtext) templateSubtext.characters = pluginMessage.subtext;
          if (templatePretext) templatePretext.characters = pluginMessage.pretext;
          if (templateCopyright) templateCopyright.characters = pluginMessage.copyright;

          figma.viewport.scrollAndZoomIntoView(nodes);
        } else {
          console.error("No matching component found for the given criteria.");
        }
      }
    } else {
      console.error("Component set with the name 'Search Results Test' not found"); 
    }
    
    //**************************************** CURATED PAGE - ASSET GENERATION LOGIC ****************************************//
    // check that a search results component was found on figma (template for generated asset)
    if (curatedWebComponentSet) {
      console.log("Found curatedWebComponentSet:", curatedWebComponentSet);

      // check if search results is selected, if it is, then find the selected variant
      if (pluginMessage.curatedSelected === true) {
        switch (pluginMessage.curatedVariant) {
          case "cp-header-only":
            selectedCuratedWebVariant = curatedWebComponentSet.findOne(node => node.type === "COMPONENT" && node.name === "CTA=No, CTA QTY=0, PreText=No, SubText=No") as ComponentNode;
            break;
          case "cp-header-subtext":
            selectedCuratedWebVariant = curatedWebComponentSet.findOne(node => node.type === "COMPONENT" && node.name === "CTA=No, CTA QTY=0, PreText=No, SubText=Yes") as ComponentNode;
            break;
          case "cp-header-cta1":
            selectedCuratedWebVariant = curatedWebComponentSet.findOne(node => node.type === "COMPONENT" && node.name === "CTA=Yes, CTA QTY=1, PreText=No, SubText=No") as ComponentNode;
            break;
          case "cp-header-cta2":
            selectedCuratedWebVariant = curatedWebComponentSet.findOne(node => node.type === "COMPONENT" && node.name === "CTA=Yes, CTA QTY=2, PreText=No, SubText=No") as ComponentNode;
            break;
          case "cp-header-pretext-cta1":
            selectedCuratedWebVariant = curatedWebComponentSet.findOne(node => node.type === "COMPONENT" && node.name === "CTA=Yes, CTA QTY=1, PreText=Yes, SubText=No") as ComponentNode;
            break;
          case "cp-header-pretext-cta2":
            selectedCuratedWebVariant = curatedWebComponentSet.findOne(node => node.type === "COMPONENT" && node.name === "CTA=Yes, CTA QTY=2, PreText=Yes, SubText=No") as ComponentNode;
            break;
        }

        if (selectedCuratedWebVariant) {
          console.log("Found selectedCuratedWebVariant:", selectedCuratedWebVariant);
          // Create an instance based on the selected variant
          const newCuratedWebPromo = selectedCuratedWebVariant.createInstance();
          nodes.push(newCuratedWebPromo);

          // Find text fields in the new instance
          const templateHeader = newCuratedWebPromo.findOne(node => node.name === "Header" && node.type === "TEXT") as TextNode;
          const templateCTA1 = newCuratedWebPromo.findOne(node => node.name === "CTA1" && node.type === "TEXT") as TextNode;
          const templateCTA2 = newCuratedWebPromo.findOne(node => node.name === "CTA2" && node.type === "TEXT") as TextNode;
          const templateSubtext = newCuratedWebPromo.findOne(node => node.name === "Subtext" && node.type === "TEXT") as TextNode;
          const templatePretext = newCuratedWebPromo.findOne(node => node.name === "PreText" && node.type === "TEXT") as TextNode;
          const templateCopyright = newCuratedWebPromo.findOne(node => node.name === "Copyright" && node.type === "TEXT") as TextNode;

          // Replace text of new instances
          if (templateHeader) templateHeader.characters = pluginMessage.header;
          if (templateCTA1) templateCTA1.characters = pluginMessage.cta1;
          if (templateCTA2) templateCTA2.characters = pluginMessage.cta2;
          if (templateSubtext) templateSubtext.characters = pluginMessage.subtext;
          if (templatePretext) templatePretext.characters = pluginMessage.pretext;
          if (templateCopyright) templateCopyright.characters = pluginMessage.copyright;

          figma.viewport.scrollAndZoomIntoView(nodes);
        } else {
          console.error("No matching component found for the given criteria.");
        }
      }
    } else {
      console.error("Component set with the name 'Curated Page Web Test' not found"); 
    }

    // figma.closePlugin();
  };
}).catch(error => {
  console.error("Error loading pages:", error);
  // figma.closePlugin();
});