import React from 'react';
import renderer from 'react-test-renderer'
import moment from 'moment-timezone'

import * as d3 from 'd3'

import DateRangeLabel from '../DateRangeLabel'

test('when the date range is less than 7days it displays time', () => {
  const props = {
    startDate: new Date(2017, 5, 23),
    endDate: new Date(2017, 5, 24, 23, 59)
  }
  const c = renderer.create(
    <DateRangeLabel {...props}/>
  )
  let tree = c.toJSON()
  expect(tree).toMatchSnapshot()
})

test('date diff using moment', () => {
  const startDate = moment().subtract(1, 'days')
  const endDate = moment()
  const ans = endDate.diff(startDate, 'days')
  console.log(ans)

  console.log(d3.timeHour.count(startDate, endDate))
  console.log(d3.timeDay.count(startDate, startDate))
  console.log(d3.timeDay.count(startDate, endDate))
  console.log(d3.timeMonth.ceil(new Date()))


  expect(ans).toBe(1)

  expect(endDate.diff(startDate, 'hours')).toBe(24)
  expect(endDate.diff(moment().subtract(2, 'days'), 'hours')).toBe(47)

})

