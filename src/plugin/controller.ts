import {fetchAirTable } from './utils'
figma.showUI(__html__, { width: 600, height: 1000 });

figma.ui.onmessage =  (msg: {type: string, airtableURL: string}) => {

  if (msg.type === 'bulk-processing') {
    if (msg.airtableURL) {
      fetchAirTable(msg.airtableURL);
      // createAutoLayoutContainer()
    } else {
      console.error('Received undefined airtableURL');
  }

}
}