interface HeaderProps {
  isAdding: boolean
  onAdd: () => void
  onCancel: () => void
}

function Header({ isAdding, onAdd, onCancel }: HeaderProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1 style={{ color: '#5a9bd5', textAlign: 'left' }}>Lista zakupów studenta PAW</h1>
      {!isAdding ? (
        <button onClick={onAdd} style={{ padding: '5px 15px', height: 'fit-content' }}>Add</button>
      ) : (
        <button
          onClick={onCancel}
          style={{ padding: '5px 15px', backgroundColor: '#e74c3c', color: 'white', border: 'none', height: 'fit-content' }}
        >
          Cancel
        </button>
      )}
    </div>
  )
}

export default Header
