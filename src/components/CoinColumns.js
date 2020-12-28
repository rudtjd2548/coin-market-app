import React from 'react'
import { coinNameKR } from './CoinName'

const columns = [
  {
    name: '코인명',
    selector: 'key',
    sortable: true,
    width: '20%',
    cell: row => {
      function getKeyByValue(object, row) {
        return object[row]
      }
      return (
        <span>{getKeyByValue(coinNameKR.bithumb, row.key)}</span>
      )
    }
  },
  {
    name: '현재가',
    selector: 'Price',
    sortable: true,
    width: '20%'
  },
  {
    name: '24시간 변동률',
    selector: 'FluctateRate',
    sortable: true,
    width: '20%',
    cell: row => {
      if (row.FluctateRate < 0) {
        return (
          <div style={{ color: 'blue' }}>
            {row.FluctateRate}% ({row.FluctateRate24}원)
          </div>
        )
      } else if (row.FluctateRate > 0) {
        return (
          <div style={{ color: 'red' }}>
            +{row.FluctateRate}% (+{row.FluctateRate24}원)
          </div>
        )
      }
    }
  }
]

export { columns }