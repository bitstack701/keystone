/**
 * Display the last quarter
 */
import React from 'react'
import {compose, setDisplayName, withState, withProps} from 'recompose'
import moment from 'moment-timezone'
import FlexBox from '../uiElements/FlexBox'

import TimeChartWithControls from './TimeChartWithControls'

const enhance = compose(
  setDisplayName("LastMonth"),
  withProps({
    groupBy: 'day',
    title: "Last quarter"
  }),
  withState('filter', 'updateFilter', {
    startDate: moment().subtract(3, 'months').set({hour: 0, minute: 0, second: 0, millisecond: 0}).toDate(),
    endDate: moment().set({hour: 23, minute: 59, second: 59}).toDate()
  })
)

const LastQuarter = enhance((props) => {
  return (
    <FlexBox column>
      <TimeChartWithControls {...props}/>
    </FlexBox>
  )
})
export default LastQuarter