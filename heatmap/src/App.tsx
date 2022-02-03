import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import { ITransaction } from './interface/ITransaction';
import CalendarHeatmap from "react-calendar-heatmap"
import 'react-calendar-heatmap/dist/styles.css';
import ReactTooltip from 'react-tooltip';
import transactionAsync from './store/transactionAction';
import { RootState } from './store/store';
import { IInitialState } from './store/transactionReducer';

const App = () => {
  const dispatch = useDispatch()
  const [transactionDate, setTransactionDate] = useState<any>()

  const state = useSelector<RootState, IInitialState>((state) => state.transactionReducer)



  const group = (array: Array<any>) => {
    return array.reduce((acc, obj) => {
      const property = obj["date"];
      acc[property] = acc[property] || [];
      acc[property].push(obj);
      return acc;
    }, {});
  };

  const total = (transactions: Array<ITransaction>): number => {
    return transactions.reduce((a: any, b: any) => {
      return a + b.amount;
    }, 0)
  }

  const creditTotal = (items: Array<ITransaction>): number => {
    let total = 0;
    items.map((items) => {
      if (items.transactionType === 'credit') {
        return total += items.amount!;
      }
    })
    return total;
  }

  const debitTotal = (items: Array<ITransaction>): number => {
    let total = 0;
    items.map((items, i) => {
      if (items.transactionType === 'debit') {
        return total += items.amount!;
      }
    })
    return total;
  }


  let value: any = []
  if (state.data) {
    let sampleDate = group(state.data!);
    const date = Object.keys(sampleDate).map((date, index) => {
      return sampleDate[date].map((items: ITransaction) => {
        return { date: items.date, amount: items.amount, transactionType: items.transactionType }
      })
    });

    value = date.map((data, index) => {
      return { date: Object.keys(sampleDate)[index], total: total(data), credit: creditTotal(data), debit: debitTotal(data) };
    });
  }
  useEffect(() => {
    dispatch(transactionAsync())
    console.log(value)
    setTransactionDate(value)
  }, [dispatch]);

  const getDayTooltip = (date: any, credit: number, debit: number): any => {
    if (value.total <= 0) {
      return {
        "data-place": "top",
        "data-tip": (`Net value for ${date} is ${credit - debit} credit is ${credit} debit is ${debit}`)
      };
    }

    return {
      "data-place": "top",
      "data-tip": (`Net value for ${date} is ${credit - debit} credit is ${credit} debit is ${debit}`)
    };
  };

  return <div>

    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'grid',
        placeItems: 'center'
      }}>
      <div
        style={{
          width: '90vw',
          height: 'auto'
        }}>
        {transactionDate &&
          <div>
            <CalendarHeatmap
              startDate={new Date('2018-12-31')}
              endDate={new Date('2019-12-31')}
              values={value}
              showMonthLabels
              showWeekdayLabels
              gutterSize={1}
              tooltipDataAttrs={(values: any) => getDayTooltip(values.date, values.credit, values.debit)}
              classForValue={(value) => {
                if (!value) return "color-empty";
                if (((value?.credit) > (value?.debit)) && (value?.credit < 8000)) return "g-1";
                if (((value?.credit) > (value?.debit))) return "g-2";
                if (((value?.credit) < (value?.debit)) && (value?.debit < 5000)) return "r-1"
                if ((value?.credit) < (value?.debit)) return "r-2"
                
              }}
            />
            <ReactTooltip />
          </div>
        }
      </div>
    </div>
  </div>;
};

export default App;

