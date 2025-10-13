import React, { useState } from 'react';

const TwoWayBinding = () => {
  const [sharedState, setSharedState] = useState({
    counter: 0,
    text: 'Shared Text',
    theme: 'light',
    user: {
      name: 'John Doe',
      email: 'john@example.com'
    }
  });

  // Functions to update shared state
  const updateCounter = (newCounter) => {
    setSharedState(prev => ({ ...prev, counter: newCounter }));
  };

  const updateText = (newText) => {
    setSharedState(prev => ({ ...prev, text: newText }));
  };

  const updateTheme = (newTheme) => {
    setSharedState(prev => ({ ...prev, theme: newTheme }));
  };

  const updateUser = (newUser) => {
    setSharedState(prev => ({ ...prev, user: { ...prev.user, ...newUser } }));
  };

  return (
    <div className="demo-container">
      <div className="component-box">
        <div className="component-title">🏠 Parent (Shared State)</div>
        <div className="data-display">
          <strong>Shared State:</strong><br/>
          Counter: {sharedState.counter}<br/>
          Text: "{sharedState.text}"<br/>
          Theme: {sharedState.theme}<br/>
          User: {sharedState.user.name} ({sharedState.user.email})
        </div>
        <div style={{ 
          backgroundColor: sharedState.theme === 'light' ? '#f8f9fa' : '#2d3748',
          color: sharedState.theme === 'light' ? '#333' : '#fff',
          padding: '10px',
          borderRadius: '5px',
          margin: '10px 0'
        }}>
          Theme Preview
        </div>
      </div>

      <div className="flow-indicator">
        <span className="arrow">⬆️⬇️</span>
        <span>Two-Way Binding</span>
        <span className="arrow">⬆️⬇️</span>
      </div>

      <CounterComponent 
        counter={sharedState.counter} 
        onCounterChange={updateCounter}
      />
      
      <TextEditor 
        text={sharedState.text} 
        onTextChange={updateText}
      />
      
      <ThemeToggle 
        theme={sharedState.theme} 
        onThemeChange={updateTheme}
      />
      
      <UserEditor 
        user={sharedState.user} 
        onUserChange={updateUser}
      />
    </div>
  );
};

// Component with two-way binding for counter
const CounterComponent = ({ counter, onCounterChange }) => {
  const increment = () => onCounterChange(counter + 1);
  const decrement = () => onCounterChange(counter - 1);
  const reset = () => onCounterChange(0);

  return (
    <div className="component-box">
      <div className="component-title">🔢 Counter Component</div>
      <div className="data-display">
        Current Value: {counter}
      </div>
      <div style={{ display: 'flex', gap: '10px', margin: '10px 0' }}>
        <button className="button" onClick={decrement}>-</button>
        <button className="button" onClick={increment}>+</button>
        <button className="button" onClick={reset}>Reset</button>
      </div>
      <div className="status success">
        📤📥 Two-way binding: receives value, sends updates
      </div>
    </div>
  );
};

// Component with two-way binding for text
const TextEditor = ({ text, onTextChange }) => {
  return (
    <div className="component-box">
      <div className="component-title">📝 Text Editor</div>
      <div className="data-display">
        Current Text: "{text}"
      </div>
      <input
        type="text"
        className="input"
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="Type to update shared text..."
      />
      <div className="status success">
        📤📥 Two-way binding: controlled input with shared state
      </div>
    </div>
  );
};

// Component with two-way binding for theme
const ThemeToggle = ({ theme, onThemeChange }) => {
  const toggleTheme = () => {
    onThemeChange(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="component-box">
      <div className="component-title">🌓 Theme Toggle</div>
      <div className="data-display">
        Current Theme: {theme}
      </div>
      <button 
        className="button" 
        onClick={toggleTheme}
        style={{ 
          backgroundColor: theme === 'light' ? '#2d3748' : '#f8f9fa',
          color: theme === 'light' ? '#fff' : '#333'
        }}
      >
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
      <div className="status success">
        📤📥 Two-way binding: receives theme, toggles and sends back
      </div>
    </div>
  );
};

// Component with two-way binding for user object
const UserEditor = ({ user, onUserChange }) => {
  const updateField = (field, value) => {
    onUserChange({ [field]: value });
  };

  return (
    <div className="component-box">
      <div className="component-title">👤 User Editor</div>
      <div className="data-display">
        Current User: {user.name} ({user.email})
      </div>
      <input
        type="text"
        className="input"
        value={user.name}
        onChange={(e) => updateField('name', e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        className="input"
        value={user.email}
        onChange={(e) => updateField('email', e.target.value)}
        placeholder="Email"
      />
      <div className="status success">
        📤📥 Two-way binding: object properties with shared state
      </div>
    </div>
  );
};

export default TwoWayBinding;
