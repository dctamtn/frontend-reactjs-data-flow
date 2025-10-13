import React, { useState } from 'react';

const ChildToParentFlow = () => {
  const [parentData, setParentData] = useState({
    userInput: '',
    selectedColor: '#667eea',
    notifications: [],
    formData: {
      name: '',
      email: '',
      age: ''
    }
  });

  // Callback functions to receive data from children
  const handleUserInput = (input) => {
    setParentData(prev => ({
      ...prev,
      userInput: input
    }));
  };

  const handleColorChange = (color) => {
    setParentData(prev => ({
      ...prev,
      selectedColor: color
    }));
  };

  const handleNotification = (message) => {
    setParentData(prev => ({
      ...prev,
      notifications: [...prev.notifications, {
        id: Date.now(),
        message,
        timestamp: new Date().toLocaleTimeString()
      }]
    }));
  };

  const handleFormSubmit = (formData) => {
    setParentData(prev => ({
      ...prev,
      formData: { ...formData }
    }));
    handleNotification(`Form submitted: ${formData.name}`);
  };

  const clearNotifications = () => {
    setParentData(prev => ({
      ...prev,
      notifications: []
    }));
  };

  return (
    <div className="demo-container">
      <div className="component-box">
        <div className="component-title">🏠 Parent Component</div>
        <div className="data-display">
          <strong>Data from Children:</strong><br/>
          User Input: "{parentData.userInput}"<br/>
          Selected Color: {parentData.selectedColor}<br/>
          Form Data: {JSON.stringify(parentData.formData, null, 2)}<br/>
          Notifications: {parentData.notifications.length}
        </div>
        <div style={{ backgroundColor: parentData.selectedColor, padding: '10px', borderRadius: '5px', color: 'white', margin: '10px 0' }}>
          Color Preview
        </div>
        <button className="button" onClick={clearNotifications}>
          Clear Notifications
        </button>
      </div>

      <div className="flow-indicator">
        <span className="arrow">⬆️</span>
        <span>Child → Parent</span>
        <span className="arrow">⬆️</span>
      </div>

      <InputChild onInputChange={handleUserInput} />
      <ColorPicker onColorChange={handleColorChange} />
      <FormChild onSubmit={handleFormSubmit} />
      <NotificationList notifications={parentData.notifications} />
    </div>
  );
};

// Child component that sends data to parent via callback
const InputChild = ({ onInputChange }) => {
  const [localInput, setLocalInput] = useState('');

  const handleSubmit = () => {
    onInputChange(localInput);
    setLocalInput('');
  };

  return (
    <div className="component-box">
      <div className="component-title">📝 Input Child</div>
      <input
        type="text"
        className="input"
        placeholder="Type something..."
        value={localInput}
        onChange={(e) => setLocalInput(e.target.value)}
      />
      <button className="button" onClick={handleSubmit}>
        Send to Parent
      </button>
      <div className="status warning">
        📤 Sends data to parent via callback function
      </div>
    </div>
  );
};

// Child component for color selection
const ColorPicker = ({ onColorChange }) => {
  const colors = ['#667eea', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#ffecd2'];

  return (
    <div className="component-box">
      <div className="component-title">🎨 Color Picker</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', margin: '10px 0' }}>
        {colors.map((color, index) => (
          <button
            key={index}
            className="button"
            style={{ backgroundColor: color, border: '2px solid #fff' }}
            onClick={() => onColorChange(color)}
          >
            {color}
          </button>
        ))}
      </div>
      <div className="status warning">
        📤 Sends selected color to parent via callback
      </div>
    </div>
  );
};

// Child component for form submission
const FormChild = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', email: '', age: '' });
  };

  return (
    <div className="component-box">
      <div className="component-title">📋 Form Child</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
        <input
          type="number"
          className="input"
          placeholder="Age"
          value={formData.age}
          onChange={(e) => handleChange('age', e.target.value)}
        />
        <button type="submit" className="button">
          Submit to Parent
        </button>
      </form>
      <div className="status warning">
        📤 Sends form data to parent via callback
      </div>
    </div>
  );
};

// Child component to display notifications
const NotificationList = ({ notifications }) => {
  return (
    <div className="component-box">
      <div className="component-title">🔔 Notifications</div>
      <div className="data-display">
        {notifications.length === 0 ? (
          'No notifications yet'
        ) : (
          notifications.map(notification => (
            <div key={notification.id} style={{ margin: '5px 0', padding: '5px', backgroundColor: '#e2e8f0', borderRadius: '3px' }}>
              <strong>{notification.timestamp}:</strong> {notification.message}
            </div>
          ))
        )}
      </div>
      <div className="status info">
        📥 Receives notifications from parent
      </div>
    </div>
  );
};

export default ChildToParentFlow;
