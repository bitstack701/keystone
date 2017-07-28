import React from 'react'
import moment from 'moment-timezone'

const DateRangeLabel = props => {
  let {
    startDate,
    endDate,
    format
  } = props

  format = format || {}

  const d = format.d || 'D'
  const m = format.m || 'MMMM'
  const y = format.y || 'YYYY'
  const dm = d + ' ' + m
  const dmy = d + ' ' + m + ' ' + y

  startDate = moment(startDate)
  endDate = moment(endDate)

  const start = {
    d: startDate.date(),
    m: startDate.month(),
    y: startDate.year()
  }
  const end = {
    d: endDate.date(),
    m: endDate.month(),
    y: endDate.year()
  }

  let rangeLabel
  if(start.d === end.d && start.m === end.m && start.y === end.y){
    rangeLabel = startDate.format(dmy)
  } else if (start.m === end.m && start.y === end.y) {
    rangeLabel = `${startDate.format(d)} - ${endDate.format(dmy)}`
  } else if (start.y === end.y){
    rangeLabel = `${startDate.format(dm)} - ${endDate.format(dmy)}`
  } else {
    rangeLabel = `${startDate.format(dmy)} - ${endDate.format(dmy)}`
  }
  return <span className="date-range-label">{rangeLabel}</span>
}

export default DateRangeLabel