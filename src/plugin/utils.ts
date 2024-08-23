const AIRTABLEAPIKEY = process.env.AIRTABLE_API_KEY;

export function fetchAirTable(airtableurl){
    console.log(airtableurl)
    fetch('https://api.airtable.com/v0/appO7sUJLojVQUUqo/Assets', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${AIRTABLEAPIKEY}`,
          'Content-Type': 'application/json'
        }
      })
      .then(r => r.json())
      .then((data: AirtableResponse) => {
        data.records.forEach((asset: Asset) => {
          
          //begin processing each airtable record 
          if (asset.fields.Variation[0]=="Half Size"){
            console.log(asset);console.log(`${asset.fields.Title}`+` - `+`${asset.fields.Variation[0]}`) 
          }
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
      

}