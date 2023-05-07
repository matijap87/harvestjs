var request = require('./request');
const dateFns = require('date-fns');

async function getTimeEntries() {
  return await request.doRequest({ endpoint: 'time_entries', params: { from: getFrom(), to: getTo() }})
}

function getFrom() {
  return dateFns.format(getToday(), getFromDateFormat())
}

function getTo() {
  return dateFns.format(dateFns.lastDayOfMonth(getToday()), getToDateFormat())
}

function getToday() {
  return new Date()
}

function getFromDateFormat() {
  return 'yyyy-MM-01'
}

function getToDateFormat() {
  return 'yyyy-MM-dd'
}

module.exports = {
  getTimeEntries
}