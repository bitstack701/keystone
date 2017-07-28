import React from 'react';
import {Route, Link} from 'react-router-dom'

import FlexBox from './uiElements/FlexBox'
import Last24Hours from './chart/Last24Hours'
import Last48Hours from './chart/Last48Hours'
import Last3Days from './chart/Last3Days'
import LastWeek from './chart/LastWeek'
import Last2Weeks from './chart/Last2Weeks'
import LastMonth from './chart/LastMonth'
import LastQuarter from './chart/LastQuarter'
import LastYear from './chart/LastYear'
// import ChartStep2 from './chart/Step2'

// import TimeChartWithControls from './chart/TimeChartWithControls'

const App = () =>
  <FlexBox column>
    <Link to="/chart/step1">Chart Step1</Link>


    <Route exact path="/chart/step1" component={Last24Hours}/>
    <Route exact path="/chart/step1" component={Last48Hours}/>
    <Route exact path="/chart/step1" component={Last3Days}/>
    <Route exact path="/chart/step1" component={LastWeek}/>
    <Route exact path="/chart/step1" component={Last2Weeks}/>
    <Route exact path="/chart/step1" component={LastMonth}/>
    <Route exact path="/chart/step1" component={LastQuarter}/>
    <Route exact path="/chart/step1" component={LastYear}/>

    {/*
     <Route exact path="/chart/step1" component={ChartStep1}/>
     <Route exact path="/chart/step1" component={ChartStep2}/>
     <Route exact path="/chart/step1" component={TimeChartWithControls}/>
     */}
  </FlexBox>

export default App;
