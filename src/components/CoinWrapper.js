import React, { Component } from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import ExpandedComponent from './ExpandedComponent'

import { columns } from './CoinColumns'

import './CoinWrapper.css'

class CoinWrapper extends Component {
  state = {
    status: 'Loading...',
    data: []
  }

  componentDidMount() {
    this.getCoinData()

    this.getCoinCandlestick()
    //this.interval = setInterval(() => {
    //  this.getCoinData()
    //}, 5000)
  }

  //componentWillUnmount() {
  //  clearInterval(this.interval);
  //}

  async getCoinCandlestick() {

    const res = await axios.get(
      'https://api.bithumb.com/public/candlestick/COS_KRW/1h'
    )

    console.log(res)

    if (res.data.status === '0000') {

    } else {
      this.setState({
        status: 'failed'
      })
    }
  }

  async getCoinData() {
    let chartData = []

    const res = await axios.get(
      'https://api.bithumb.com/public/ticker/all'
    )

    if (res.data.status === '0000') {
      delete res.data.data['date'];

      for (let [key, value] of Object.entries(res.data.data)) {
        chartData.push({
          key: key,
          Price: Number(value.closing_price),
          FluctateRate: Number(value['fluctate_rate_24H']),
          FluctateRate24: Number(value['fluctate_24H'])
        })
      }

      this.setState({
        status: 'successed',
        data: chartData
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
        expandableRows
        expandableRowsComponent={<ExpandedComponent />}
      />
    )
  }
}

export default CoinWrapper
