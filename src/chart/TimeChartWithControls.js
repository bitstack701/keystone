/**
 * A wrapper component which combines the TimeChart, DateRangeFilter and the Refresh button
 */
import React from 'react'
import {compose, setDisplayName, withState, defaultProps, withHandlers} from 'recompose'
import moment from 'moment-timezone'

import FlexBox from '../uiElements/FlexBox'
import FlexItem from '../uiElements/FlexItem'
import TimeChart from './TimeChart'
import DateRangeLabel from '../uiElements/DateRangeLabel'
import Button from '../uiElements/Button'
import GroupByToggle from '../uiElements/GroupByToggle'
import {getInterval} from '../Util'

const createRandomData = (props) => {
  const {filter, groupBy} = props
  const {startDate, endDate} = filter
  return getInterval(groupBy).range(startDate, endDate, 1)
    .map(d => ({date: d, count: Math.random()*100}))

}

const enhance = compose(
  setDisplayName("ChartStep1"),
  defaultProps({groupBy: 'hour'}),
  withState('brush', 'updateBrush', {
    startDate: undefined,
    endDate: undefined
  }),
  withState('data', 'refreshData', createRandomData),
  withState('groupBy', 'updateGroupBy', ({groupBy}) => groupBy),
  withHandlers({
    onGroupByChanged: ({updateGroupBy, refreshData, filter}) => ({data}) => {
      console.log('******', data)
      updateGroupBy(data.value)
      refreshData(createRandomData({filter, groupBy: data.value}))
    }
  })
)

const TimeChartWithControls = enhance((props) => {
  const {title, filter, brush, updateBrush, refreshData, data, groupBy, onGroupByChanged} = props

  // If the brush has a start date use it to pass into the DateRangeLabel else use the filter
  const brushOrFilter = brush.startDate ? brush : filter

  return (
    <FlexBox column>
      {/* render out the title if we have one*/}
      {title ? <div style={{marginLeft: 50}}><h3>{title}, group by {groupBy}</h3></div> : null}
      <FlexBox style={{alignItems: 'center', marginLeft: 50, marginRight: 50}}>
        <FlexItem>
          <span> Date range: <DateRangeLabel {...{startDate: brushOrFilter.startDate, endDate: brushOrFilter.endDate}} /></span>
        </FlexItem>
        <FlexBox style={{flex: 1, justifyContent: 'flex-end', alignSelf: 'flex-end'}}>
          <GroupByToggle initialValue={groupBy} onValueChanged={onGroupByChanged}/>
          <Button size="tiny" onClick={() => {
            return refreshData(createRandomData(props))
          }}>Refresh</Button>
        </FlexBox>
      </FlexBox>
      <FlexItem>
        <TimeChart {...{brushUpdated: updateBrush, data, groupBy}}/>
      </FlexItem>
    </FlexBox>
  )
})
export default TimeChartWithControls