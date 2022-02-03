import React, {useEffect} from 'react';
import './App.css';
import {transactions} from './data';
import {ITransaction} from './interface/ITransaction';
import CalendarHeatmap from "react-calendar-heatmap"
import 'react-calendar-heatmap/dist/styles.css';

function App2() {

        function group(array : any) {
            return array.reduce((acc : any, obj : any) : any => {
                const property = obj['date'];
                acc[property] = acc[property] || [];
                acc[property].push(obj);
                return acc;
            }, {});
        };
  
        const total = (transactions: Array<ITransaction>):number =>{
         return transactions.reduce((a:any,b:any) => {
              return a + b.amount;
        }, 0)
      }

        useEffect(() => {
          console.log(total)
        //  console.log(group(transactions))
        // console.log(transact)

        }, [])


  const transact = transactions.sort((a: ITransaction, b: ITransaction): number => {
    return +new Date(a.date!) - +new Date(b.date!)
  }).map((items: ITransaction, index) => {
    const { transactionType, date, amount } = items
    // if (transactionType === "credit") {
    //   return (
    //     console.log(amount)
    //   )
    // }
    // else
    //   return (
    //     console.log(`debit is ${amount}`)
    //   )


  })

  transact.reduce((a,b)=> {
      return(
        console.log
      )
  })

    // let dailyArray
//      useEffect(() => {
//     let dailyArray = dailyTransaction(transactions)
//     Object.keys(dailyArray).map((items:any):any =>{
  
//     (dailyArray[items].map((items:any) =>{
// let debit = 0;
//       let {amount, transactionType, date} = items
//       // console.log(`${amount}, ${transactionType}, ${date}`)
//       if (transactionType === "debit"){
//     return (
//       // console.log(`${amount}, ${transactionType}`)
//      console.log( debit += amount)
      
//       )}
//       else
//       return(
//         console.log("credit")
//       )
//     }))
//     });
//     }, [])

    return (
        <div>
            {
  //   transactions.sort((a:ITransaction,b:ITransaction):number=>{ return +new Date(a.date!) - +new Date(b.date!)
  //   }).map((items:ITransaction, index) =>{
  //     const {transactionType, date, amount} = items
  //     if(transactionType === "credit"){
  //     return(
  //       <div key={index}> {`${transactionType} ${date} ${amount}`}</div>
  //     )
  //   }
  //   else
  //   return (
  //     <div key={index}> {`debit is ${transactionType} ${date} ${amount}`}</div>
  //   )
  
  
  // } )


  }
            <div
                style={{
                width: '100vw',
                height: '100vh',
                display: 'grid',
                placeItems: 'center'
            }}>
                <div
                    style={{
                    width: '70vw',
                    height: 'auto'
                }}>
                    <CalendarHeatmap
                        startDate={new Date('2019-01-01')}
                        endDate={new Date('2019-12-31')}
                        values={transactions}
                        showMonthLabels
                        showWeekdayLabels
                    //     classForValue={(value) => {
                    //     if (!value) 
                    //         return 'color-empty' if (value.transactionType == 'credit') 
                    //             return 'color-github-3' return 'color-gitlab-2'
                    // }}
                    />
                </div>
            </div>
        </div>
    )
}

export default App2;
