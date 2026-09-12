import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

const ContextFlow = () => {
  const { theme, userName, notifications } = useContext(AppContext);

  return (
    <div className="demo-container">
      <div className="component-box">
        <div className="component-title">🌐 Context Provider State</div>
        <div className="data-display">
          <strong>Shared Context Value:</strong><br/>
          Theme: {theme}<br/>
          User: {userName}<br/>
          Notifications: {notifications}
        </div>
        <div className="status info">
          📦 Provides shared values to all descendants
        </div>
      </div>

      <div className="flow-indicator">
        <span className="arrow">⬇️</span>
        <span>Provider → Consumers</span>
        <span className="arrow">⬇️</span>
      </div>

      <ContextToolbar />
      <ContextProfile />
      <ContextNotifications />
    </div>
  );
};

const ContextProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [userName, setUserName] = useState('Alex');
  const [notifications, setNotifications] = useState(0);

  const contextValue = {
    theme,
    userName,
    notifications,
    toggleTheme: () => setTheme(prev => (prev === 'light' ? 'dark' : 'light')),
    changeUserName: (name) => setUserName(name),
    addNotification: () => setNotifications(prev => prev + 1)
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

const ContextToolbar = () => {
  const { theme, toggleTheme, addNotification } = useContext(AppContext);

  return (
    <div className="component-box">
      <div className="component-title">🛠️ Toolbar Consumer</div>
      <div className="data-display">
        This component reads the theme and actions directly from Context.
      </div>
      <button className="button" onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
      <button className="button" onClick={addNotification}>
        Add Notification
      </button>
      <div className="status success">
        📥 Reads Context without receiving props from its parent
      </div>
    </div>
  );
};

const ContextProfile = () => {
  const { userName, changeUserName } = useContext(AppContext);

  return (
    <div className="component-box">
      <div className="component-title">👤 Profile Consumer</div>
      <div className="data-display">
        Current user: {userName}
      </div>
      <button className="button" onClick={() => changeUserName('Taylor')}>
        Change User to Taylor
      </button>
      <div className="status success">
        📥 A separate consumer receives the same shared Context
      </div>
    </div>
  );
};

const ContextNotifications = () => {
  const { notifications } = useContext(AppContext);

  return (
    <div className="component-box">
      <div className="component-title">🔔 Notifications Consumer</div>
      <div className="data-display">
        Notifications received: {notifications}
      </div>
      <div className="status info">
        🔄 Re-renders when the Context value changes
      </div>
    </div>
  );
};

const ContextFlowWithProvider = () => (
  <ContextProvider>
    <ContextFlow />
  </ContextProvider>
);

export default ContextFlowWithProvider;