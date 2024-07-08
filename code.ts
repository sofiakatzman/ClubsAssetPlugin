figma.showUI(__html__);
figma.ui.resize(350, 500);

figma.loadAllPagesAsync().then(() => {
  figma.ui.onmessage = async pluginMessage => {
    console.log("Received message:", pluginMessage);
    const nodes:SceneNode[] = [];
    const postComponentSet = figma.root.findOne(node => node.type == "COMPONENT_SET" && node.name == "post") as ComponentSetNode;
    let selectedVariant = null;

    if (postComponentSet) {
      console.log("Found postComponentSet:", postComponentSet);

      // if (pluginMessage.darkModeState === true) {
      //   switch (pluginMessage.imageVariant) {
      //     case "2":
      //       selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=single, Dark mode=true") as ComponentNode;
      //       break;
      //     case "3":
      //       selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=carousel, Dark mode=true") as ComponentNode;
      //       break;
      //     default:
      //       selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=none, Dark mode=true") as ComponentNode;
      //       break;
      //   }
      // } else {
      //   switch (pluginMessage.imageVariant) {
      //     case "2":
      //       selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=single, Dark mode=false") as ComponentNode;
      //       break;
      //     case "3":
      //       selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=carousel, Dark mode=false") as ComponentNode;
      //       break;
      //     default:
      //       selectedVariant = postComponentSet.defaultVariant as ComponentNode;
      //       break;
      //   }
      }

    //   if (selectedVariant) {
    //     console.log("Found selectedVariant:", selectedVariant);
    //     // create instance based on selected variant
    //     const newPost = selectedVariant.createInstance();
    //     // find text fields in new instance
    //     const templateName= newPost.findOne(node => node.name == "displayName" && node.type == "TEXT") as TextNode;
    //     const templateUserName= newPost.findOne(node => node.name == "@username" && node.type == "TEXT") as TextNode;
    //     const templateDescription= newPost.findOne(node => node.name == "description" && node.type == "TEXT") as TextNode;
        
    //     // Load fonts
    //     await figma.loadFontAsync({ family: "Rubik", style: "Regular" });
    //     nodes.push(newPost)
    //     // Replace text of new instances
    //     templateName.characters = pluginMessage.name;
    //     templateUserName.characters = pluginMessage.username;
    //     templateDescription.characters = pluginMessage.description;
    //   } else {
    //     console.error("No matching component found for the given criteria.");
    //   }
    // } else {
    //   console.error("Component set with the name 'post' not found");
    // }
    
    
    figma.viewport.scrollAndZoomIntoView(nodes);
    figma.closePlugin();
  };
}).catch(error => {
  console.error("Error loading pages:", error);
  figma.closePlugin();
});