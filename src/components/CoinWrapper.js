import React, { Component } from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component'


import { columns } from './CoinColumns'

import './CoinWrapper.css'

class CoinWrapper extends Component {
  state = {
    status: 'Loading...',
    data: []
  }

  componentDidMount() {
    this.getCoinData()

    this.interval = setInterval(() => {
      this.getCoinData()
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  async getCoinData() {
    let changedData = []

    const res = await axios.get(
      'https://api.bithumb.com/public/ticker/all'
    )

    if (res.data.status === '0000') {
      delete res.data.data['date'];

      for (let [key, value] of Object.entries(res.data.data)) {
        changedData.push({
          key: key,
          Price: Number(value.closing_price),
          FluctateRate: Number(value['fluctate_rate_24H']),
          FluctateRate24: Number(value['fluctate_24H']),
          FluctatePriceToday: Number((Number(value['closing_price']) - Number(value['prev_closing_price'])).toFixed(5)),
          FluctateRateToday: Number(((Number(value['closing_price']) - Number(value['prev_closing_price'])) / Number(value['opening_price']) * 100).toFixed(2))
        })
      }

      this.setState({
        status: 'successed',
        data: changedData
      })
    } else {
      this.setState({
        status: 'failed'
      })
    }
  }
  render() {
    const { data } = this.state

    return (
      <DataTable
        title="빗썸 마켓 가격정보(Made by Evan Jin)"
        className='DataTable'
        columns={columns}
        data={data}
        highlightOnHover
      />
    )
  }
}

export default CoinWrapper
