import { useState, useEffect } from 'react'

function App() {
  const STORAGE_KEY = 'profitCalculatorData';

  const [items, setItems] = useState(() => {
    // Try to load data from localStorage
    const savedData = localStorage.getItem(STORAGE_KEY);
    console.log('Loading from localStorage:', savedData);
    if (savedData) {
      return JSON.parse(savedData);
    }
    // If no data exists, return initial state
    return [{ id: 1, name: '', buyPrice: '', sellPrice: '', profit: null }];
  });

  // Save data to localStorage whenever items change
  useEffect(() => {
    console.log('Saving to localStorage:', items);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addRow = () => {
    setItems([
      ...items,
      { id: items.length + 1, name: '', buyPrice: '', sellPrice: '', profit: null }
    ])
  }

  const removeRow = (id) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id))
    }
  }

  const updateItem = (id, field, value) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value }
        if (field === 'buyPrice' || field === 'sellPrice') {
          const buy = parseFloat(updatedItem.buyPrice)
          const sell = parseFloat(updatedItem.sellPrice)
          updatedItem.profit = (!isNaN(buy) && !isNaN(sell)) ? sell - buy : null
        }
        return updatedItem
      }
      return item
    }))
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', margin: 0, padding: 0 }}>
      <div style={{ width: '100%', maxWidth: '64rem', backgroundColor: '#f3f4f6', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '1.5rem' }}>
        <h1 style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'black' }}>Profit Calculator</h1>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', textAlign: 'center', margin: '0 auto' }}>
            <thead>
              <tr style={{ backgroundColor: '#e5e7eb' }}>
                <th style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151', width: '25%' }}>Item Name</th>
                <th style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151', width: '25%' }}>Buy Price</th>
                <th style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151', width: '25%' }}>Sell Price</th>
                <th style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151', width: '25%' }}>Profit</th>
                <th style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151', width: '5rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #d1d5db' }}>
                  <td style={{ padding: '0.5rem 1rem' }}>
                    <textarea
                      value={item.name}
                      onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                      style={{ width: '100%', borderRadius: '0.375rem', border: '1px solid #d1d5db', padding: '0.5rem', textAlign: 'center' }}
                      placeholder="Item name"
                      rows="1"
                    />
                  </td>
                  <td style={{ padding: '0.5rem 1rem' }}>
                    <input
                      type="number"
                      value={item.buyPrice}
                      onChange={(e) => updateItem(item.id, 'buyPrice', e.target.value)}
                      style={{ width: '100%', borderRadius: '0.375rem', border: '1px solid #d1d5db', padding: '0.5rem', textAlign: 'center' }}
                      placeholder="Buy price"
                    />
                  </td>
                  <td style={{ padding: '0.5rem 1rem' }}>
                    <input
                      type="number"
                      value={item.sellPrice}
                      onChange={(e) => updateItem(item.id, 'sellPrice', e.target.value)}
                      style={{ width: '100%', borderRadius: '0.375rem', border: '1px solid #d1d5db', padding: '0.5rem', textAlign: 'center' }}
                      placeholder="Sell price"
                    />
                  </td>
                  <td style={{ padding: '0.5rem 1rem' }}>
                    {item.profit !== null && (
                      <span style={{ color: item.profit >= 0 ? '#059669' : '#dc2626' }}>
                        {item.profit.toFixed(2)}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '0.5rem 1rem' }}>
                    {items.length > 1 && (
                      <button
                        onClick={() => removeRow(item.id)}
                        style={{ color: '#ef4444', cursor: 'pointer' }}
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button
            onClick={addRow}
            style={{ backgroundColor: '#22c55e', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.375rem', cursor: 'pointer' }}
          >
            Add Row
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
