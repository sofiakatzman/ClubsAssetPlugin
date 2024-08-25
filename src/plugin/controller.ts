import {fetchAirTable } from './utils'
figma.showUI(__html__, { width: 600, height: 1000 });

figma.ui.onmessage = (msg) => {
  if (msg.type === 'bulk-processing') {
    if (msg.airtableURL) {
      fetchAirTable(msg.airtableURL);
    } else {
      console.error('Received undefined airtableURL');
    }
  }

  if (msg.type === 'resize-ui') {
    const { width, height } = msg.dimensions;
    figma.ui.resize(width, height);
  }
};