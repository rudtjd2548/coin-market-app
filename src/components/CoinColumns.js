import React from 'react'
import { /*coinNameKR,*/ coinNameV2 } from './CoinName'
import { addComma } from '../utils/utils'

//function getKeyByValue(object, row) {
//  return object[row]
//}

const columns = [
  {
    name: '코인명',
    maxWidth: '210px',
    width: '20%',
    selector: 'key',
    sortable: true,
    cell: row => {
      return row.key === 'COS'
        ? (
          <div className='COS_name_Column'>
            콘텐토스&#128192;
          </div>
        )
        : (
          <div>
            {coinNameV2[row.i][row.key]}
            {
              coinNameV2[row.i]['BN'] === 'USDT' ? <span>&#128192;</span> :
                coinNameV2[row.i]['BN'] === 'BIDR' ||
                  coinNameV2[row.i]['BN'] === 'BUSD' ||
                  coinNameV2[row.i]['BN'] === 'ETH' ||
                  coinNameV2[row.i]['BN'] === 'TRX' ||
                  coinNameV2[row.i]['BN'] === 'BTC' ? <span>&#128191;</span> : ''
            }
            <div className='KeyName'>{row.key}/{coinNameV2[row.i]['BN'] ? coinNameV2[row.i]['BN'] : 'KRW'}</div>
          </div>
        )
    }
  },
  {
    name: '현재가',
    maxWidth: '210px',
    width: '26%',
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
    width: '20%',
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
          <div className='ZeroFluctateRate'>
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
    width: '19%',
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