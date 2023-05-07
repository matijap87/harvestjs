const dateFns = require('date-fns');
const axios = require('axios');

async function doRequest(urlData) {

    const url = constructUrl(urlData)
    const headers = {
      "User-Agent": `HarvestJS (${process.env.HARVEST_ACCESS_EMAIL})`,
      "Authorization": "Bearer " + process.env.HARVEST_ACCESS_TOKEN,
      "Harvest-Account-ID": process.env.HARVEST_ACCOUNT_ID
    }

    const config = {
      headers
    }

    return await axios.get(url, config)
    .then(res => res.data.time_entries)
};


function constructUrl(urlData) {
  const today = new Date()

  let url = `${process.env.HARVEST_API_URL}/${urlData.endpoint}`

  if (urlData.hasOwnProperty('params')) {
    url += '?'  + new URLSearchParams(urlData.params)
  }

  return url
}

module.exports = { doRequest };
