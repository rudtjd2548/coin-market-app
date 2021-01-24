import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component'

import { columns } from './CoinColumns'

import './CoinWrapper.css'
import ExpandedComponent from './ExpandedComponent';

const CoinWrapper = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    getCoinData()

    const interval = setInterval(() => {
      getCoinData()
    }, 600000)

    return () => clearInterval(interval)
  }, [])

  async function getCoinData() {
    let changedData = []
    let index = 0
    const res = await axios.get(
      'https://api.bithumb.com/public/ticker/all'
    )

    if (res.data.status === '0000') {
      delete res.data.data['date'];
      for (let [key, value] of Object.entries(res.data.data)) {
        changedData.push({
          i: index,
          key: key,
          Price: Number(value.closing_price),
          MarketCap: Math.floor(value.acc_trade_value_24H / 1000000),
          FluctatePriceToday: Number((Number(value['closing_price']) - Number(value['prev_closing_price'])).toFixed(5)),
          FluctateRateToday: Number(((Number(value['closing_price']) - Number(value['prev_closing_price'])) / Number(value['opening_price']) * 100).toFixed(2))
        })
        index += 1
      }
      //console.log('coinWrapper getCoinData()')
      setData(changedData)
    }
  }
  //console.log('coinWrapper updated')
  return (
    <DataTable
      title="빗썸 마켓 가격정보(Made by Evan)"
      className='DataTable'
      columns={columns}
      data={data}
      highlightOnHover
      responsive={true}
      expandableRows
      expandableRowsComponent={
        <ExpandedComponent />
      }
    />
  )
}

export default CoinWrapper