/**
 * Display the last month
 */
import React from 'react'
import {compose, setDisplayName, withState, withProps} from 'recompose'
import moment from 'moment-timezone'
import FlexBox from '../uiElements/FlexBox'

import TimeChartWithControls from './TimeChartWithControls'

const enhance = compose(
  setDisplayName("Last3Days"),
  withProps({
    groupBy: 'hour',
    title: "Last 3 days"
  }),
  withState('filter', 'updateFilter', {
    startDate: moment().subtract(72, 'hours').set({minute: 0, second: 0, millisecond: 0}).toDate(),
    endDate: moment().set({hour: 23, minute: 59, second: 59}).toDate()
  })
)

const Last3Days = enhance((props) => {
  return (
    <FlexBox column>
      <TimeChartWithControls {...props}/>
    </FlexBox>
  )
})

export default Last3Days