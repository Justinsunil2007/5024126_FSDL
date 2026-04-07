import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Focus from './pages/Focus';
import Visualizer from './pages/Visualizer';
import Canvas from './components/Canvas';
import './App.css';

function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [thoughts, setThoughts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [goals, setGoals] = useState([]);
  const [completedSessions, setCompletedSessions] = useState(0);

  useEffect(() => {
    const savedThoughts = localStorage.getItem('mindflow-thoughts');
    if (savedThoughts) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setThoughts(JSON.parse(savedThoughts));
    }
    const savedGoals = localStorage.getItem('mindflow-goals');
    if (savedGoals) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setGoals(JSON.parse(savedGoals));
    }
    const savedSessions = localStorage.getItem('mindflow-sessions');
    if (savedSessions) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCompletedSessions(parseInt(savedSessions, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mindflow-thoughts', JSON.stringify(thoughts));
  }, [thoughts]);

  useEffect(() => {
    localStorage.setItem('mindflow-goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('mindflow-sessions', completedSessions.toString());
  }, [completedSessions]);

  const addThought = (thought) => {
    setThoughts([...thoughts, { id: Date.now(), text: thought, animate: true }]);
    setTimeout(() => {
      setThoughts(prev => prev.map(t => t.animate ? { ...t, animate: false } : t));
    }, 500);
  };

  const deleteThought = (id) => {
    setThoughts(thoughts.filter(t => t.id !== id));
  };

  const editThought = (id, newText) => {
    setThoughts(thoughts.map(t => t.id === id ? { ...t, text: newText } : t));
  };

  const clearAllThoughts = () => {
    setThoughts([]);
  };

  const addGoal = (goal) => {
    setGoals([...goals, { id: Date.now(), text: goal, completed: false }]);
  };

  const toggleGoal = (id) => {
    setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  const filteredThoughts = thoughts.filter(t => t.text.toLowerCase().includes(searchTerm.toLowerCase()));

  const renderTab = () => {
    switch (currentTab) {
      case 'home':
        return <Home />;
      case 'focus':
        return <Focus onSessionComplete={() => setCompletedSessions(prev => prev + 1)} />;
      case 'visualizer':
        return <Visualizer thoughts={thoughts} onAddThought={addThought} onDeleteThought={deleteThought} onEditThought={editThought} />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <div className="tabs">
        <button
          className={currentTab === 'home' ? 'active' : ''}
          onClick={() => setCurrentTab('home')}
        >
          Home
        </button>
        <button
          className={currentTab === 'focus' ? 'active' : ''}
          onClick={() => setCurrentTab('focus')}
        >
          Focus
        </button>
        <button
          className={currentTab === 'visualizer' ? 'active' : ''}
          onClick={() => setCurrentTab('visualizer')}
        >
          Visualizer
        </button>
      </div>
      <div className="tab-content">
        {renderTab()}
      </div>

      {/* New sections below */}
      <div className="scroll-indicator">Scroll Down ↓</div>

      <section className="section thought-management">
        <h2>🧠 Thought Management</h2>
        <div className="thought-grid">
          {filteredThoughts.map((item) => (
            <div key={item.id} className={`thought-card ${item.animate ? 'animate' : ''}`}>
              <span>{item.text}</span>
              <button onClick={() => deleteThought(item.id)}>×</button>
            </div>
          ))}
        </div>
        <button className="clear-all" onClick={clearAllThoughts}>Clear All Thoughts</button>
      </section>

      <section className="section search-filter">
        <h2>🔍 Search & Filter</h2>
        <input
          type="text"
          placeholder="Search thoughts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <p>Showing {filteredThoughts.length} of {thoughts.length} thoughts</p>
      </section>

      <section className="section productivity-stats">
        <h2>📊 Productivity Stats</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Thoughts</h3>
            <p>{thoughts.length}</p>
          </div>
          <div className="stat-card">
            <h3>Completed Sessions</h3>
            <p>{completedSessions}</p>
          </div>
        </div>
      </section>

      <section className="section daily-goals">
        <h2>🎯 Daily Goals</h2>
        <div className="goal-input">
          <input
            type="text"
            placeholder="Add a new goal..."
            onKeyPress={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                addGoal(e.target.value.trim());
                e.target.value = '';
              }
            }}
          />
        </div>
        <div className="goals-list">
          {goals.map((goal) => (
            <div key={goal.id} className="goal-item">
              <input
                type="checkbox"
                checked={goal.completed}
                onChange={() => toggleGoal(goal.id)}
              />
              <span className={goal.completed ? 'completed' : ''}>{goal.text}</span>
            </div>
          ))}
        </div>
      </section>

      <Canvas />
    </div>
  );
}

export default App;
