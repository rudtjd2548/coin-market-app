import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { createChart, CrosshairMode } from 'lightweight-charts'

import './ExpandedComponent.css'
import { formatDate } from './../utils/dateFormat'
import { abbreviateNumber } from './../utils/prefixNumber'

let candleSeries//, volumeSeries

function ExpandedComponent2(props) {
  const [data, setData] = useState([])
  const chartContainerRef = useRef()
  const chart = useRef()

  useEffect(() => {
    getCoinData(setData)
    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      crosshair: {
        mode: CrosshairMode.Normal,
      }
    })
    candleSeries = chart.current.addCandlestickSeries()
    candleSeries.applyOptions({
      priceFormat: {
        type: 'custom',
        formatter: price => abbreviateNumber(price.toFixed(4)),
      },
    })
    //volumeSeries = chart.current.addHistogramSeries()
  }, [])

  useEffect(() => {
    candleSeries.setData(data)
    //volumeSeries.setData(data)
  }, [data])

  async function getCoinData() {
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
      setData(changedData)
    }
  }
  return (
    <div className='Chart' ref={chartContainerRef} />
  )
}

export default ExpandedComponent2
