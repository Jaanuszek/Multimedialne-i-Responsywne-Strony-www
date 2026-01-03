import { useState, useEffect } from 'react'
import './App.css'
import StartStopButton from './components/StartStopButton'
import ResetButton from './components/ResetButton'

function App() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval: number | undefined

    if (isRunning) {
      interval = setInterval(() => {
        setTime(prev => prev + 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning])

  const handleStart = () => setIsRunning(true)
  const handleStop = () => setIsRunning(false)
  const handleReset = () => {
    setIsRunning(false)
    setTime(0)
  }

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div>
      <h1>Timer</h1>
      <h2 style={{ fontSize: '48px' }}>{formatTime(time)}</h2>
      <div>
        <StartStopButton
          isRunning={isRunning}
          onStart={handleStart}
          onStop={handleStop}
        />
        <ResetButton onReset={handleReset} />
      </div>
    </div>
  )
}

export default App
