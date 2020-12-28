import React from 'react'
import { coinNameKR } from './CoinName'
import { addComma } from '../utils/addComma'

const columns = [
  {
    name: '코인명',
    maxWidth: '210px',
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
          </div>
        )
    }
  },
  {
    name: '현재가',
    maxWidth: '210px',
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
  {
    name: '24시간 변동률',
    selector: 'FluctateRate',
    sortable: true,
    cell: row => {
      if (row.FluctateRate < 0) {
        return (
          <div className='PlusFluctateRate'>
            {row.FluctateRate24} 원<br />({row.FluctateRate} %)
          </div>
        )
      } else if (row.FluctateRate > 0) {
        return (
          <div className='MinusFluctateRate'>
            +{row.FluctateRate24} 원<br />(+{row.FluctateRate} %)
          </div>
        )
      }
    }
  }
]

export { columns }