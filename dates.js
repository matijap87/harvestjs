const dateFns = require('date-fns');
const srLocale = require('date-fns/locale/sr-Latn');

function getCurrentMonthDate() {
  return dateFns.format(new Date, 'LLLL', {locale: srLocale})
}

function format(date, format) {
  return dateFns.format(date, format)
}

function getToday() {
  return new Date()
}

function lastDayOfMonth() {
  return dateFns.lastDayOfMonth(this.getToday(), this.getToDateFormat())
}

function getFromDateFormat() {
  return 'yyyy-MM-01'
}

function getToDateFormat() {
  return 'yyyy-MM-dd'
}

module.exports = {
  getCurrentMonthDate,
  format,
  getToday,
  getFromDateFormat,
  getToDateFormat,
  lastDayOfMonth
}