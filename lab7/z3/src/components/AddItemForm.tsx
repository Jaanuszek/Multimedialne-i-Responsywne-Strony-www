interface AddItemFormProps {
  newText: string
  newImportant: boolean
  onTextChange: (text: string) => void
  onImportantChange: (important: boolean) => void
  onSave: () => void
}

function AddItemForm({ newText, newImportant, onTextChange, onImportantChange, onSave }: AddItemFormProps) {
  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>
      <input
        type="text"
        value={newText}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="Dodaj przedmiot..."
        style={{ flex: 1, padding: '8px', border: '1px solid #ccc' }}
      />
      <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <input
          type="checkbox"
          checked={newImportant}
          onChange={(e) => onImportantChange(e.target.checked)}
        />
        bardzo ważne
      </label>
      <button
        onClick={onSave}
        style={{ padding: '5px 15px', backgroundColor: '#3498db', color: 'white', border: 'none' }}
      >
        Save
      </button>
    </div>
  )
}

export default AddItemForm
