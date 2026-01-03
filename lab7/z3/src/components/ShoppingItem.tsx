import type { Item } from '../types'

interface ShoppingItemProps {
  item: Item
  onToggleBought: (id: number) => void
}

function ShoppingItem({ item, onToggleBought }: ShoppingItemProps) {
  return (
    <li
      onClick={() => onToggleBought(item.id)}
      style={{
        color: item.important ? '#e67e22' : '#999',
        textDecoration: item.bought ? 'line-through' : 'none',
        cursor: 'pointer',
        padding: '5px 0'
      }}
    >
      {item.text}
    </li>
  )
}

export default ShoppingItem
