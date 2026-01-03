
interface StartStopButtonProps {
    isRunning: boolean
    onStart: () => void
    onStop: () => void
}

function StartStopButton({ isRunning, onStart, onStop }: StartStopButtonProps) {
  return (
    <>
      <button
        onClick={onStart}
        disabled={isRunning}
        style={{ backgroundColor: 'green', color: 'white', margin: '5px', padding: '10px 20px' }}
      >
        Start
      </button>
      <button
        onClick={onStop}
        disabled={!isRunning}
        style={{ backgroundColor: 'orange', color: 'white', margin: '5px', padding: '10px 20px' }}
      >
        Stop
      </button>
    </>
  )
}

export default StartStopButton