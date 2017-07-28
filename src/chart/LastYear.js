/**
 * Display the last quarter
 */
import React from 'react'
import {compose, setDisplayName, withState, withProps} from 'recompose'
import * as d3 from 'd3'
import FlexBox from '../uiElements/FlexBox'

import TimeChartWithControls from './TimeChartWithControls'

const enhance = compose(
  setDisplayName("LastYear"),
  withProps({
    groupBy: 'month',
    title: "Last year"
  }),
  withState('filter', 'updateFilter', {
    startDate: d3.timeMonth.ceil(d3.timeMonth.offset(new Date(), -12)),
    endDate: d3.timeMonth.ceil(new Date())
  })
)

const LastYear = enhance((props) => {
  return (
    <FlexBox column>
      <TimeChartWithControls {...props}/>
    </FlexBox>
  )
})
export default LastYear