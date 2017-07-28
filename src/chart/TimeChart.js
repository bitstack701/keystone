/**
 *
 * Brushing examples https://bl.ocks.org/mbostock/6232537 and https://bl.ocks.org/mbostock/6232620
 */
import React from 'react'
import {compose, setDisplayName, lifecycle, setPropTypes, withProps, onlyUpdateForKeys, defaultProps} from 'recompose'
import * as d3 from 'd3'
import moment from 'moment-timezone'

import chartColors from './chartColors'
import './chart.css'
import {uid4, getInterval, getXFormatStr, getXXFormatStr, getXTicks, getXXTicks} from '../Util'

const margin = {top: 20, right: 50, bottom: 50, left: 50}

const drawBackground = (selection, widthLessMargin, heightLessMargin) => {
  selection
    .append("rect")
    .style("fill", "rgba(0, 0, 0, 0.2)")
    .attr("width", widthLessMargin)
    .attr("height", heightLessMargin)
}

const drawBars = (selection, data, widthLessMargin, heightLessMargin, xScale, yScale, groupBy) => {
  selection.select('.bars').remove();
  selection
    .append('g')
    .attr("class", "bars")
    .selectAll('rect')
    .data(data, d => d.date)
    .enter()
    .append('rect')
    .style('fill', chartColors.neutral)
    .attr('x', function (d) {
      // We need to determine where the starting point of the bar needs to be, using the xScale
      // and the group by to determine the padding
      if (groupBy === 'month') {
        const startOfMonthPlusOneDay = moment(d.date).startOf('month').add(1, 'day').toDate()
        return xScale(startOfMonthPlusOneDay)
      } else if (groupBy === 'day') {
        const startOfMonthPlusOneHour = moment(d.date).startOf('day').add(1, 'hour').toDate()
        return xScale(startOfMonthPlusOneHour)
      } else if (groupBy === 'hour') {
        const startOfHourPlush5min = moment(d.date).startOf('hour').add(5, 'minutes').toDate()
        return xScale(startOfHourPlush5min)
      }
    })
    .attr('y', heightLessMargin)
    .attr('height', 0)
    .attr('width', (d) => {
      // Similar to determining the x position, here we need to determine the width so again we
      // use the xScale and the group by to determine what the width should be allowing for the
      // padding on the right
      let startXPosition, endXPosition
      if (groupBy === 'month') {
        const startOfMonthPlusOneDay = moment(d.date).startOf('month').add(1, 'day').toDate()
        startXPosition = xScale(startOfMonthPlusOneDay)
        const endOfMonthLessOneDay = moment(d.date).endOf('month').subtract(1, 'day').toDate()
        endXPosition = xScale(endOfMonthLessOneDay)
      } else if (groupBy === 'day') {
        const startOfMonthPlusOneHour = moment(d.date).startOf('day').add(1, 'hour').toDate()
        startXPosition = xScale(startOfMonthPlusOneHour)
        const endOfMonthLessOneHour = moment(d.date).endOf('day').subtract(1, 'hour').toDate()
        endXPosition = xScale(endOfMonthLessOneHour)
      } else if (groupBy === 'hour') {
        const startOfHourPlush5min = moment(d.date).startOf('hour').add(5, 'minutes').toDate()
        startXPosition = xScale(startOfHourPlush5min)
        const endOfHourMinus5Min = moment(d.date).endOf('hour').subtract(5, 'minutes').toDate()
        endXPosition = xScale(endOfHourMinus5Min)
      }
      return endXPosition-startXPosition
    })
    .transition()
    .duration(100)
    .delay((d,i) => {
      return i * 15
    })
    .attr('y', function (d) {
      return heightLessMargin - yScale(d.count);
    })
    .attr('height', function (d) {
      return yScale(d.count);
    })
}

const drawXAxis = (selection, width, heightLessMargin, xScale, groupBy) => {
  selection.select('.x-axis').remove();
  selection.select('.xx-axis').remove();

  const hourOfDay = d3.axisBottom(xScale)
    // .ticks(getXTicks(groupBy, width))
    .tickPadding(5)
    .tickFormat(d3.timeFormat(getXFormatStr(groupBy))); // 00...09, 10, 11, 12, 13...23

  const dayMonthYear = d3.axisBottom(xScale)
    // .ticks(getXXTicks(groupBy, width))
    .tickPadding(5)
    .tickSize(0)
    .tickFormat(d3.timeFormat(getXXFormatStr(groupBy)))
/*
    .tickFormat((d, i) => {
      if (groupBy === 'month') {

      } else if (groupBy === 'hour') {
        if (moment(d).hour() === 0) {
          return d3.timeFormat("%d %A %B %Y")(d)
        }
      } else if (groupBy === 'day') {
        if (moment(d).date() === 1 || i === 0) {
          return d3.timeFormat("%A %B %Y")(d)
        }
      } else {
        throw new Error(`Unknown groupBy ${groupBy}`)
      }
    }); // 01 Thursday August 2013
*/

  selection
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + heightLessMargin + ")")
    .call(hourOfDay)
    .selectAll("text")
    .style("text-anchor", 'start')
    .style("fill", '#c1c1c1')
    .style("stroke", 'none')

  selection
    .append("g")
    .attr("class", "xx-axis")
    .attr("transform", "translate(0," + (heightLessMargin + 20) + ")")
    .call(dayMonthYear)
    .selectAll("text")
    .style("text-anchor", 'start')
    .style("fill", '#c1c1c1')
    .style("stroke", 'none')
}

const drawBrush = (selection, widthLessMargin, heightLessMargin, xScale, brushUpdated, interval) => {
  function brushEnd() {
    // when the user clears the brush reset the filter to the full date range
    if (d3.event.selection === null && brushUpdated) {
      brushUpdated({startDate: undefined, endDate: undefined})
    }
  }

  function brushed(p) {
    console.log('brushed');
    if (d3.event.sourceEvent.type === "brush") return;
    const d0 = d3.event.selection.map(xScale.invert),
      d1 = d0.map(interval.round);

    // If empty when rounded, use floor instead.
    if (d1[0] >= d1[1]) {
      d1[0] = interval.floor(d0[0]);
      d1[1] = interval.offset(d1[0]);
    }
    d3.select(this).call(d3.event.target.move, d1.map(xScale));

    brushUpdated && brushUpdated({startDate: d1[0], endDate: d1[1]})
  }

  selection.append("g")
    .attr("class", "brush")
    .call(d3.brushX()
      .on("brush", brushed)
      .on("end", brushEnd)
      .extent([[0, 0], [widthLessMargin, heightLessMargin]]))
}

const drawChart = (selector, data, brushUpdated, groupBy) => {
  console.log(selector);
  const container = d3.select(selector)
  container.select('svg').remove()

  const boundingClientRect = container.node().getBoundingClientRect()
  let height = boundingClientRect.height
  let width = boundingClientRect.width || boundingClientRect.left || boundingClientRect.right

  let widthLessMargin = width - margin.left - margin.right
  let heightLessMargin = height - margin.top - margin.bottom

  const interval = getInterval(groupBy)

  let max = d3.max(data, d => d.count)
  max = max + (max * 0.1) // max + 10% so that we pad the yAxis by 10%
  const yScale = d3.scaleLinear()
    .domain([0, max])
    .range([heightLessMargin, 0]);

  const xScale = d3.scaleTime()
    .domain([
      d3.min(data, ({date}) => date),
      interval.offset(d3.max(data, ({date}) => date), 1)])
    .range([0, widthLessMargin]);

  const svg = container.append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.call(drawBackground, widthLessMargin, heightLessMargin)
  svg.call(drawBars, data, widthLessMargin, heightLessMargin, xScale, yScale, groupBy)
  svg.call(drawXAxis, width, heightLessMargin, xScale, groupBy)
  svg.call(drawBrush, widthLessMargin, heightLessMargin, xScale, brushUpdated, interval)
}

const chartStyle = {
  width: 'calc(100vw-0)',
  height: 180
}

const enhance = compose(
  setDisplayName("TimeChart"),
  defaultProps({
    filter: {
      startDate: moment().subtract(24, 'hours').set({minute: 0, second: 0, millisecond: 0}).toDate(),
      endDate: moment().set({hour: 23, minute: 59, second: 59}).toDate()
    }
  }),
  onlyUpdateForKeys(['data']),
  withProps(() => ({chartId: `chart-${uid4()}`})),
  setPropTypes({
    brushUpdated: React.PropTypes.func,
  }),
  lifecycle({
    componentDidMount() {
      const {chartId, data, brushUpdated, groupBy} = this.props
      const selector = `#${chartId}`
      drawChart(selector, data, brushUpdated, groupBy)
      d3.select(window).on(`resize.${chartId}`, () => drawChart(selector, data, brushUpdated, groupBy))
    },
    componentDidUpdate(prevProps) {
      d3.select(window).on(`resize.${prevProps.chartId}`, null)
      const {chartId, data, brushUpdated, groupBy} = this.props
      const selector = `#${chartId}`
      drawChart(selector, data, brushUpdated, groupBy)
      d3.select(window).on(`resize.${chartId}`, () => drawChart(selector, data, brushUpdated, groupBy))
    }
  })
)

const TimeChart = enhance((props) => {
  return <div id={props.chartId} style={chartStyle}/>
})

export default TimeChart