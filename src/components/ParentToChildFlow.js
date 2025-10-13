import React, { useState } from 'react';

const ParentToChildFlow = () => {
  const [parentMessage, setParentMessage] = useState('Hello from Parent!');
  const [parentCount, setParentCount] = useState(0);
  const [parentData, setParentData] = useState({
    items: ['Apple', 'Banana', 'Cherry'],
    selectedItem: null
  });

  const updateMessage = () => {
    const messages = [
      'Hello from Parent!',
      'Parent says Hi!',
      'Data flowing down!',
      'Props are awesome!'
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setParentMessage(randomMessage);
  };

  const incrementCount = () => {
    setParentCount(prev => prev + 1);
  };

  const addItem = () => {
    const newItems = ['Grape', 'Orange', 'Mango', 'Pineapple'];
    const randomItem = newItems[Math.floor(Math.random() * newItems.length)];
    setParentData(prev => ({
      ...prev,
      items: [...prev.items, randomItem]
    }));
  };

  const selectItem = (item) => {
    setParentData(prev => ({
      ...prev,
      selectedItem: item
    }));
  };

  return (
    <div className="demo-container">
      <div className="component-box">
        <div className="component-title">🏠 Parent Component</div>
        <div className="data-display">
          <strong>Parent State:</strong><br/>
          Message: {parentMessage}<br/>
          Count: {parentCount}<br/>
          Items: {parentData.items.length}<br/>
          Selected: {parentData.selectedItem || 'None'}
        </div>
        <button className="button" onClick={updateMessage}>
          Update Message
        </button>
        <button className="button" onClick={incrementCount}>
          Increment Count
        </button>
        <button className="button" onClick={addItem}>
          Add Item
        </button>
      </div>

      <div className="flow-indicator">
        <span className="arrow">⬇️</span>
        <span>Parent → Child</span>
        <span className="arrow">⬇️</span>
      </div>

      <MessageDisplay 
        message={parentMessage} 
        count={parentCount}
        onUpdateMessage={updateMessage}
      />
      
      <ItemList 
        items={parentData.items}
        selectedItem={parentData.selectedItem}
        onSelectItem={selectItem}
      />
    </div>
  );
};

// Child component that receives and displays data from parent
const MessageDisplay = ({ message, count, onUpdateMessage }) => {
  return (
    <div className="component-box">
      <div className="component-title">💬 Message Display (Child)</div>
      <div className="data-display">
        <strong>Received from Parent:</strong><br/>
        Message: "{message}"<br/>
        Count: {count}
      </div>
      <div className="status success">
        📥 Receives message and count as props
      </div>
      <button className="button" onClick={onUpdateMessage}>
        Trigger Parent Update
      </button>
    </div>
  );
};

// Another child component for list display
const ItemList = ({ items, selectedItem, onSelectItem }) => {
  return (
    <div className="component-box">
      <div className="component-title">📋 Item List (Child)</div>
      <div className="data-display">
        <strong>Received from Parent:</strong><br/>
        Items: {items.join(', ')}<br/>
        Selected: {selectedItem || 'None'}
      </div>
      <div className="status success">
        📥 Receives items array and selection as props
      </div>
      <div style={{ marginTop: '10px' }}>
        {items.map((item, index) => (
          <button
            key={index}
            className="button"
            style={{ 
              margin: '2px',
              backgroundColor: selectedItem === item ? '#48bb78' : '#667eea'
            }}
            onClick={() => onSelectItem(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ParentToChildFlow;
