import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, removeItem, selectInvoiceItems } from './invoiceItemSlice' // Importing actions and selectors

const InvoiceItems = () => {
    const dispatch = useDispatch()
    const invoiceItems = useSelector(selectInvoiceItems) // Getting invoice items from the Redux store

    const [itemName, setItemName] = useState('')

    const handleAddItem = () => {
        dispatch(addItem({ id: Math.random(), name: itemName })) // Dispatching addItem action
        setItemName('')
    }

    const handleRemoveItem = id => {
        dispatch(removeItem(id)) // Dispatching removeItem action
    }

    return (
        <div>
            <h2>Invoice Items</h2>
            <ul>
                {invoiceItems.map(item => (
                    <li key={item.id}>
                        {item.name}
                        <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <div>
                <input
                    type='text'
                    value={itemName}
                    onChange={e => setItemName(e.target.value)}
                />
                <button onClick={handleAddItem}>Add Item</button>
            </div>
        </div>
    )
}

export default InvoiceItems
