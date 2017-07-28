/**
 * Work out the basics of displaying a column/bar chart, reloading data, x axis, brushing,
 * displaying the start and end dates after brushing.
 *
 * One month group by day.
 */
import React from 'react'
import {compose, setDisplayName, withState, withProps} from 'recompose'
import moment from 'moment-timezone'

import FlexBox from '../uiElements/FlexBox'
import FlexItem from '../uiElements/FlexItem'
import TimeChart from './TimeChart'
import DateRangeLabel from '../uiElements/DateRangeLabel'
import Button from '../uiElements/Button'
import {getInterval} from '../Util'


const createRandomData = (props) => {
  const {filter, groupBy} = props
  const {startDate, endDate} = filter
  return getInterval(groupBy).range(startDate, endDate, 1)
    .map(d => ({date: d, count: Math.random()*100}))
}

const enhance = compose(
  setDisplayName("ChartStep2"),
  withProps({groupBy: 'day'}),
  withState('filter', 'updateFilter', {
    startDate: moment().subtract(3, 'months').set({hour: 0, minute: 0, second: 0, millisecond: 0}).toDate(),
    endDate: moment().set({hour: 23, minute: 59, second: 59}).toDate()
  }),
  withState('data', 'refreshData', createRandomData),
)

const ChartStep2 = enhance((props) => {
  const {filter, updateFilter, refreshData, data, groupBy} = props
  return (
    <FlexBox column>
      <FlexBox style={{alignItems: 'center', marginLeft: 5, marginRight: 5}}>
        <FlexItem>
          <span> Date range: <DateRangeLabel {...{startDate: filter.startDate, endDate: filter.endDate}} /></span>
        </FlexItem>
        <FlexBox style={{flex: 1, justifyContent: 'flex-end', alignSelf: 'flex-end'}}>
          <Button size="tiny" onClick={() => {
            return refreshData(createRandomData(props))
          }}>Refresh</Button>
        </FlexBox>
      </FlexBox>
      <FlexItem>
        <TimeChart {...{brushUpdated: updateFilter, data, groupBy}}/>
      </FlexItem>
    </FlexBox>
  )
})
export default ChartStep2