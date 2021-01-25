import React, { useState, useEffect } from 'react'
import './TimerComponent.css'

const Timer = ({ seconds, info }) => {
  const [timer, setTimer] = useState(seconds)

  useEffect(() => {
    const countDown = setInterval(() => {
      if (timer > 1) setTimer(timer - 1)
      else setTimer(seconds)
    }, 1000);
    return () => clearInterval(countDown)
  }, [timer, setTimer, seconds])

  return (
    <div>
      <div className="loading" />
      <span className="timer">
        {info} data will refresh in {timer < 10 ? '0' : ''}{timer}
      </span>
    </div>
  )
}

export default Timer
