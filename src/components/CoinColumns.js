import React from 'react'
import { coinNameKR } from './CoinName'
import { addComma } from '../utils/addComma'

const columns = [
  {
    name: '코인명',
    maxWidth: '210px',
    width: '25%',
    selector: 'key',
    sortable: true,
    cell: row => {
      function getKeyByValue(object, row) {
        return object[row]
      }

      return row.key === 'COS'
        ? (
          <div className='COS_name_Column'>
            {getKeyByValue(coinNameKR.bithumb, row.key)}★
          </div>
        )
        : (
          <div>
            {getKeyByValue(coinNameKR.bithumb, row.key)}
            <div className='KeyName'>{row.key}/KRW</div>
          </div>
        )
    }
  },
  {
    name: '현재가',
    maxWidth: '210px',
    width: '20%',
    selector: 'Price',
    sortable: true,
    cell: row => {
      return (
        <div className='Price'>
          {addComma(row.Price)}원
        </div>
      )
    }
  },
  //{
  //  name: '24h 변동률',
  //  maxWidth: '150px',
  //  width: '20%',
  //  selector: 'FluctateRate',
  //  sortable: true,
  //  cell: row => {
  //    if (row.FluctateRate < 0) {
  //      return (
  //        <div className='MinusFluctateRate'>
  //          {row.FluctateRate} %
  //          <div className='SmallPrice'>{row.FluctateRate24}</div>
  //        </div>
  //      )
  //    } else if (row.FluctateRate > 0) {
  //      return (
  //        <div className='PlusFluctateRate'>
  //          +{row.FluctateRate} %
  //          <div className='SmallPrice'>+{row.FluctateRate24}</div>
  //        </div>
  //      )
  //    } else if (row.FluctateRate === 0) {
  //      return (
  //        <div style={{ textAlign: "right" }}>
  //          0.00 %
  //          <div className='SmallPrice'>0</div>
  //        </div>
  //      )
  //    }
  //  }
  //},
  {
    name: '당일 변동률',
    maxWidth: '150px',
    width: '25%',
    selector: 'FluctateRateToday',
    sortable: true,
    cell: row => {
      if (row.FluctateRateToday < 0) {
        return (
          <div className='MinusFluctateRate'>
            {row.FluctateRateToday} %
            <div className='SmallPrice'>{row.FluctatePriceToday}</div>
          </div>
        )
      } else if (row.FluctateRateToday > 0) {
        return (
          <div className='PlusFluctateRate'>
            +{row.FluctateRateToday} %
            <div className='SmallPrice'>+{row.FluctatePriceToday}</div>
          </div>
        )
      } else if (row.FluctateRateToday === 0) {
        return (
          <div style={{ textAlign: "right" }}>
            0.00 %
            <div className='SmallPrice'>0</div>
          </div>
        )
      }
    }
  },
  {
    name: '거래금액(백만원)',
    maxWidth: '210px',
    width: '35%',
    selector: 'MarketCap',
    sortable: true,
    cell: row => {
      return (
        <div className='MarketCap'>
          {(addComma(row.MarketCap))}
        </div>
      )
    }
  },
]

export { columns }