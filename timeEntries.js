var request = require('./request');
const dateFns = require('date-fns');
const dates = require('./dates.js')

async function getTimeEntries() {
  return await request.doRequest({ endpoint: 'time_entries', params: { from: getFrom(), to: getTo() }})
}

function getFrom() {
  return dates.format(dates.getToday(), dates.getFromDateFormat())
}

function getTo() {
  return dates.format(dates.lastDayOfMonth(dates.getToday()), dates.getToDateFormat())
}

module.exports = {
  getTimeEntries
}