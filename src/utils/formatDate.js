import moment from 'moment'

export function formatDate (dateTimeString) {
  if (!dateTimeString) return ''
  return moment(dateTimeString).format('YYYY-MM-DD')
}
