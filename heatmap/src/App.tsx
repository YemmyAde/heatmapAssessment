import React from 'react';
import logo from './logo.svg';
import './App.css';
import { transactions } from './data';
import { ITransaction } from './interface/ITransaction';
import CalendarHeatmap from "react-calendar-heatmap"
import 'react-calendar-heatmap/dist/styles.css';

function App() {
  return (
    <div> 
      <CalendarHeatmap
  startDate={new Date('2016-01-01')}
  endDate={new Date('20116-12-31')}
  values={[
    { date: '2016-01-01', count:1 },
    { date: '2016-01-22', count:3 },
    { date: '2016-01-30', count:5 },
  ]}
  showMonthLabels={true}
  showWeekdayLabels={true}
/>
    </div>
  )
}

export default App;
