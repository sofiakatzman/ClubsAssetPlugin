import {fetchAirTable, makeSeries} from './utils'
figma.showUI(__html__, { width: 600, height: 240 });

figma.ui.onmessage = (msg) => {
  if (msg.type === 'bulk-processing') {
    if (msg.airtableURL) {
      fetchAirTable(msg.airtableURL);
    } else {
      console.error('Received undefined airtableURL');
    }
  }

  if(msg.type === 'make-series'){
    makeSeries(msg)
  }

  if (msg.type === 'resize-ui') {
    const { width, height } = msg.dimensions;
    figma.ui.resize(width, height);
  }
};

