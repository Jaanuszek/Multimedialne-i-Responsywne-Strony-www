
function ResetButton({ onReset }: { onReset: () => void }) {
  return (
    <button
      onClick={onReset}
      style={{ backgroundColor: 'red', color: 'white', margin: '5px', padding: '10px 20px' }}
    >
      Reset
    </button>
  )
}

export default ResetButton