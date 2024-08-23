import {fetchAirTable} from './utils'
figma.showUI(__html__);

figma.ui.onmessage =  (msg: {type: string, airtableURL: string}) => {

  if (msg.type === 'bulk-processing') {
    if (msg.airtableURL) {
      fetchAirTable(msg.airtableURL);
    } else {
      console.error('Received undefined airtableURL');
  }

}
}