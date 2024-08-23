import {fetchAirTable} from './utils'
figma.showUI(__html__);

figma.ui.onmessage =  (msg: {type: string, airtableurl: string}) => {


  if (msg.type === 'bulk-processing') {
    fetchAirTable(msg.airtableurl)

  }


};
