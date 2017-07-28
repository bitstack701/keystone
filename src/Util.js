import * as d3 from 'd3'

export function uid() {
  return Math.floor((1 + Math.random()) * 0x1000)
    .toString(16);
}

export function uid2() {
  return `${uid()}-${uid()}`
}

export function uid4() {
  return `${uid2()}-${uid2()}`
}

export function getInterval(groupBy) {
  switch (groupBy) {
    case 'hour':
      return d3.timeHour
      break

    case 'day':
      return d3.timeDay
      break

    case 'month':
      return d3.timeMonth
      break

    default:
      throw Error('Unknown groupBy expected hour day week month year')
  }
}

export function getXFormatStr(groupBy) {
  switch (groupBy) {
    case 'month':
      return '%M'
      break

    case 'hour':
      return '%H'
      break

    case 'day':
      return '%d'
      break

    default:
      throw Error('Unknown groupBy expected hour day week month year')
  }
}

export function getXXFormatStr(groupBy) {
  switch (groupBy) {
    case 'month':
      return '%B %Y'
      break

    case 'hour':
      return "%d %A %B %Y"
      break

    case 'day':
      return "%A %B %Y"
      break

    default:
      throw Error(`Unknown groupBy expected hour || day || week || month || year, received ${groupBy}`)
  }
}

export function getXTicks(groupBy, width) {
  switch (groupBy) {
    case 'month':
      return 12
      break

    case 'hour':
      return width < 1000 ? 24 : 48
      break

    case 'day':
      return width < 1000 ? 20 : 31
      break

    default:
      throw Error('Unknown groupBy expected hour day week month year')
  }
}

export function getXXTicks(groupBy, width) {
  switch (groupBy) {
    case 'month':
      return 6
      break

    case 'hour':
      return width < 1000 ? 2 : 2
      break

    case 'day':
      return width < 1000 ? 3 : 3
      break

    default:
      throw Error('Unknown groupBy expected hour day week month year')
  }
}