import React, { useState } from 'react';

// Top-level component that manages all state
const UnidirectionalFlow = () => {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    age: 30,
    preferences: {
      theme: 'light',
      notifications: true
    }
  });

  const [counter, setCounter] = useState(0);

  const updateUserData = (newData) => {
    setUserData(prev => ({ ...prev, ...newData }));
  };

  const incrementCounter = () => {
    setCounter(prev => prev + 1);
  };

  return (
    <div className="demo-container">
      <div className="component-box">
        <div className="component-title">🏠 Parent Component</div>
        <div className="data-display">
          <strong>State Management:</strong><br/>
          User: {userData.name}<br/>
          Counter: {counter}
        </div>
        <button className="button" onClick={incrementCounter}>
          Increment Counter
        </button>
        <button 
          className="button" 
          onClick={() => updateUserData({ name: 'Jane Smith' })}
        >
          Change Name
        </button>
      </div>

      <div className="flow-indicator">
        <span className="arrow">⬇️</span>
        <span>Data flows down</span>
        <span className="arrow">⬇️</span>
      </div>

      <UserProfile userData={userData} counter={counter} />
      <UserPreferences preferences={userData.preferences} />
    </div>
  );
};

// Child component that receives data as props
const UserProfile = ({ userData, counter }) => {
  return (
    <div className="component-box">
      <div className="component-title">👤 User Profile (Child)</div>
      <div className="data-display">
        <strong>Received Props:</strong><br/>
        Name: {userData.name}<br/>
        Email: {userData.email}<br/>
        Age: {userData.age}<br/>
        Counter: {counter}
      </div>
      <div className="status info">
        📥 Receives data from parent via props
      </div>
    </div>
  );
};

// Another child component
const UserPreferences = ({ preferences }) => {
  return (
    <div className="component-box">
      <div className="component-title">⚙️ User Preferences (Child)</div>
      <div className="data-display">
        <strong>Received Props:</strong><br/>
        Theme: {preferences.theme}<br/>
        Notifications: {preferences.notifications ? 'Enabled' : 'Disabled'}
      </div>
      <div className="status info">
        📥 Receives data from parent via props
      </div>
    </div>
  );
};

export default UnidirectionalFlow;
