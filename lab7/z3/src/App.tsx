import { useState } from 'react'
import './App.css'
import type { Item } from './types'
import Header from './components/Header'
import AddItemForm from './components/AddItemForm'
import ShoppingList from './components/ShoppingList'

function App() {
  const [items, setItems] = useState<Item[]>([
    { id: 1, text: '20kg jabłek', important: true, bought: false },
    { id: 2, text: '2 bułeczki', important: false, bought: true },
    { id: 3, text: '10 jogurtów', important: false, bought: true },
  ])
  const [isAdding, setIsAdding] = useState(false)
  const [newText, setNewText] = useState('')
  const [newImportant, setNewImportant] = useState(false)

  const handleAdd = () => {
    setIsAdding(true)
    setNewText('')
    setNewImportant(false)
  }

  const handleCancel = () => {
    setIsAdding(false)
    setNewText('')
    setNewImportant(false)
  }

  const handleSave = () => {
    if (newText.trim()) {
      setItems([
        { id: Date.now(), text: newText, important: newImportant, bought: false },
        ...items
      ])
    }
    setIsAdding(false)
    setNewText('')
    setNewImportant(false)
  }

  const toggleBought = (id: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, bought: !item.bought } : item
    ))
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', border: '1px solid #ccc', borderRadius: '8px' }}>
      <Header isAdding={isAdding} onAdd={handleAdd} onCancel={handleCancel} />

      {isAdding && (
        <AddItemForm
          newText={newText}
          newImportant={newImportant}
          onTextChange={setNewText}
          onImportantChange={setNewImportant}
          onSave={handleSave}
        />
      )}

      <ShoppingList items={items} onToggleBought={toggleBought} />
    </div>
  )
}

export default App
