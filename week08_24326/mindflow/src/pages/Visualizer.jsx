import { useState, useEffect, useRef } from 'react';

const Visualizer = ({ thoughts, onAddThought, onDeleteThought, onEditThought }) => {
  const [thought, setThought] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const addThought = () => {
    if (thought.trim()) {
      onAddThought(thought);
      setThought('');
    }
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    onEditThought(editingId, editText);
    setEditingId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  return (
    <div className="page visualizer">
      <h1>Thought Visualizer</h1>
      <div className="input-section">
        <input
          ref={inputRef}
          type="text"
          value={thought}
          onChange={(e) => setThought(e.target.value)}
          placeholder="Enter your thought"
          onKeyPress={(e) => e.key === 'Enter' && addThought()}
        />
        <button onClick={addThought}>Add Thought</button>
      </div>
      <div className="thoughts">
        {thoughts.map((item) => (
          <div key={item.id} className={`thought-card ${item.animate ? 'animate' : ''}`}>
            {editingId === item.id ? (
              <div>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                  autoFocus
                />
                <button onClick={saveEdit}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </div>
            ) : (
              <div>
                <span onDoubleClick={() => startEdit(item.id, item.text)}>{item.text}</span>
                <button onClick={() => onDeleteThought(item.id)}>×</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Visualizer;