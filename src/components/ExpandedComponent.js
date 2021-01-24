import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { createChart, CrosshairMode } from 'lightweight-charts'

import './ExpandedComponent.css'
import { formatDate, abbreviateNumber } from './../utils/utils'
import { coinNameV2 } from './CoinName'

let candleSeriesBN, candleSeriesBT, volumnSeriesBN, volumnSeriesBT

function ExpandedComponent(props) {
  const [bithumbData, setBithumbData] = useState([])
  const [binanceData, setBinanceData] = useState([])
  const [toggleBN, setToggleBN] = useState(true)
  const [toggleBT, setToggleBT] = useState(true)
  const chartContainerRef = useRef()
  const chart = useRef()

  useEffect(() => {
    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      crosshair: {
        mode: CrosshairMode.Normal,
      }
    })
    candleSeriesBN = chart.current.addCandlestickSeries()
    candleSeriesBN.applyOptions({
      priceFormat: {
        type: 'custom',
        formatter: price => abbreviateNumber(price.toFixed(4)),
      },
    })

    candleSeriesBT = chart.current.addCandlestickSeries({
      upColor: '#d23c4b',
      downColor: '#1e5fd2',
      borderUpColor: '#d23c4b',
      borderDownColor: '#1e5fd2',
      wickUpColor: '#d23c4b',
      wickDownColor: '#1e5fd2',
    })
    candleSeriesBT.applyOptions({
      priceFormat: {
        type: 'custom',
        formatter: price => abbreviateNumber(price.toFixed(4)),
      },
    })

    volumnSeriesBN = chart.current.addHistogramSeries({
      color: '#f0b90b',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
      scaleMargins: {
        top: 0.8,
        bottom: 0.02,
      },
    })
    volumnSeriesBT = chart.current.addHistogramSeries({
      color: '#24292e',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
      scaleMargins: {
        top: 0.8,
        bottom: 0.02,
      },
    })
  }, [])

  useEffect(() => { // binance api
    const getBinanceData = async () => {
      let formatedData = []
      let date = new Date()
      let today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      const res = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${props.data.key}${coinNameV2[props.data.i]['BN']}&interval=1d`)
      const res2 = await axios.get(`https://free.currconv.com/api/v7/convert?q=USD_KRW,KRW_USD&compact=ultra&date=${today}&apiKey=${process.env.REACT_APP_CURRENCY_API_KEY}`)
      const todayUSDtoKRW = Object.values(res2.data.USD_KRW).toString()
      if (res.status !== 200) console.log('failed to fetch Binance API')
      for (let value of Object.values(res.data)) {
        formatedData.push({
          time: formatDate(value[0]),
          value: +value[5],
          open: +value[1] * todayUSDtoKRW,
          high: +value[2] * todayUSDtoKRW,
          low: +value[3] * todayUSDtoKRW,
          close: +value[4] * todayUSDtoKRW
        })
      }
      setBinanceData(formatedData)
    }
    getBinanceData()
  }, [props.data.key, props.data.i])

  useEffect(() => { // bithumb data
    const getBithumbData = async () => {
      let changedData = []
      const res = await axios.get(`https://api.bithumb.com/public/candlestick/${props.data.key}_KRW/24h`)

      if (res.data.status === '0000') {
        for (let value of Object.values(res.data.data)) {
          changedData.push({
            time: formatDate(value[0]),
            value: +value[5],
            open: +value[1],
            high: +value[3],
            low: +value[4],
            close: +value[2]
          })
        }
        setBithumbData(changedData)
      }
    }
    getBithumbData(setBithumbData)
  }, [props.data.key])

  useEffect(() => {
    if (toggleBT && !toggleBN) {
      candleSeriesBT.setData(bithumbData)
      volumnSeriesBT.setData(bithumbData)
      candleSeriesBN.setData([])
      volumnSeriesBN.setData([])
    }
    else if (!toggleBT && toggleBN) {
      candleSeriesBT.setData([])
      volumnSeriesBT.setData([])
      candleSeriesBN.setData(binanceData)
      volumnSeriesBN.setData(binanceData)
    } else if (toggleBT && toggleBN) {
      candleSeriesBT.setData(bithumbData)
      volumnSeriesBT.setData(bithumbData)
      candleSeriesBN.setData(binanceData)
      volumnSeriesBN.setData(binanceData)
    } else {
      candleSeriesBT.setData([])
      volumnSeriesBT.setData([])
      candleSeriesBN.setData([])
      volumnSeriesBN.setData([])
    }
  }, [binanceData, bithumbData, toggleBN, toggleBT])

  return (
    <>
      <div className='checkboxWrapper'>
        <label htmlFor='Binance'>Bithumb</label>
        <input
          type='checkbox'
          id='Bithumb'
          checked={toggleBT ? "checked" : ""}
          onChange={() => setToggleBT(!toggleBT)}
        />
        <label htmlFor='Binance'>Binance({(coinNameV2[props.data.i]['BN']) ? coinNameV2[props.data.i]['BN'] : ''})</label>
        <input
          type='checkbox'
          id='Binance'
          checked={toggleBN ? "checked" : ""}
          onChange={() => setToggleBN(!toggleBN)} />
      </div>
      <div className='Chart' ref={chartContainerRef} />
    </>
  )
}

export default ExpandedComponent
