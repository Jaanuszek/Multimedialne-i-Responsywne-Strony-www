import type { Item } from '../types'
import ShoppingItem from './ShoppingItem'

interface ShoppingListProps {
  items: Item[]
  onToggleBought: (id: number) => void
}

function ShoppingList({ items, onToggleBought }: ShoppingListProps) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
      {items.map(item => (
        <ShoppingItem
          key={item.id}
          item={item}
          onToggleBought={onToggleBought}
        />
      ))}
    </ul>
  )
}

export default ShoppingList
