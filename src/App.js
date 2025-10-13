import React, { useState } from 'react';
import UnidirectionalFlow from './components/UnidirectionalFlow';
import ParentToChildFlow from './components/ParentToChildFlow';
import ChildToParentFlow from './components/ChildToParentFlow';
import TwoWayBinding from './components/TwoWayBinding';
import './App.css';

function App() {
  const [activePattern, setActivePattern] = useState('unidirectional');

  const patterns = [
    {
      id: 'unidirectional',
      title: 'Unidirectional Flow (Top-Down)',
      description: 'Data flows in one direction from parent to children components via props. This is the most common and recommended pattern in React.',
      component: UnidirectionalFlow
    },
    {
      id: 'parent-to-child',
      title: 'Parent → Child Flow',
      description: 'Parent component manages state and passes data down to child components through props. Children are purely presentational.',
      component: ParentToChildFlow
    },
    {
      id: 'child-to-parent',
      title: 'Child → Parent Flow',
      description: 'Children communicate with parent through callback functions. Parent receives data and updates its state accordingly.',
      component: ChildToParentFlow
    },
    {
      id: 'two-way-binding',
      title: 'Two-Way Binding Pattern',
      description: 'Components share state and can both read and update the same data. Similar to Angular\'s two-way binding but implemented with React patterns.',
      component: TwoWayBinding
    }
  ];

  const activePatternData = patterns.find(pattern => pattern.id === activePattern);
  const ActiveComponent = activePatternData.component;

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>React Data Flow Patterns</h1>
          <p>Understanding different ways data flows between React components</p>
        </header>

        <div className="pattern-selector">
          <h2>Select a Pattern to Explore:</h2>
          <div className="pattern-buttons">
            {patterns.map(pattern => (
              <button
                key={pattern.id}
                className={`pattern-button ${activePattern === pattern.id ? 'active' : ''}`}
                onClick={() => setActivePattern(pattern.id)}
              >
                {pattern.title}
              </button>
            ))}
          </div>
        </div>

        <div className="pattern-section">
          <h2 className="pattern-title">{activePatternData.title}</h2>
          <p className="pattern-description">{activePatternData.description}</p>
          
          <div className="pattern-explanation">
            <h3>How it works:</h3>
            <ul>
              {activePattern === 'unidirectional' && (
                <>
                  <li>🏠 Parent component holds all state</li>
                  <li>⬇️ Data flows down to children via props</li>
                  <li>📥 Children receive data but cannot modify it directly</li>
                  <li>🔄 Parent updates state, children re-render automatically</li>
                </>
              )}
              {activePattern === 'parent-to-child' && (
                <>
                  <li>🏠 Parent manages state and business logic</li>
                  <li>⬇️ Data is passed down through props</li>
                  <li>📥 Children are presentational components</li>
                  <li>🎯 Parent controls all data updates</li>
                </>
              )}
              {activePattern === 'child-to-parent' && (
                <>
                  <li>📤 Children send data up via callback functions</li>
                  <li>⬆️ Parent receives data and updates state</li>
                  <li>🔄 State changes trigger re-renders</li>
                  <li>📡 Communication happens through function props</li>
                </>
              )}
              {activePattern === 'two-way-binding' && (
                <>
                  <li>🔄 Components share the same state</li>
                  <li>⬆️⬇️ Data flows both ways</li>
                  <li>📤📥 Components can read and update shared data</li>
                  <li>🎯 Similar to Angular's two-way binding</li>
                </>
              )}
            </ul>
          </div>

          <div className="demo-section">
            <h3>Live Demo:</h3>
            <ActiveComponent />
          </div>

          <div className="pattern-benefits">
            <h3>Benefits of this pattern:</h3>
            <ul>
              {activePattern === 'unidirectional' && (
                <>
                  <li>✅ Predictable data flow</li>
                  <li>✅ Easy to debug and test</li>
                  <li>✅ Follows React best practices</li>
                  <li>✅ Clear separation of concerns</li>
                </>
              )}
              {activePattern === 'parent-to-child' && (
                <>
                  <li>✅ Simple and straightforward</li>
                  <li>✅ Easy to understand data flow</li>
                  <li>✅ Good for presentational components</li>
                  <li>✅ Centralized state management</li>
                </>
              )}
              {activePattern === 'child-to-parent' && (
                <>
                  <li>✅ Enables child-to-parent communication</li>
                  <li>✅ Flexible event handling</li>
                  <li>✅ Good for form inputs and user interactions</li>
                  <li>✅ Maintains React's unidirectional flow</li>
                </>
              )}
              {activePattern === 'two-way-binding' && (
                <>
                  <li>✅ Convenient for shared state</li>
                  <li>✅ Reduces prop drilling</li>
                  <li>✅ Good for complex forms</li>
                  <li>✅ Familiar pattern from other frameworks</li>
                </>
              )}
            </ul>
          </div>
        </div>

        <footer className="footer">
          <p>
            This demo showcases different React data flow patterns. 
            Each pattern has its use cases and benefits. 
            Choose the right pattern based on your application's needs.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
