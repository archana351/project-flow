import { useState } from 'react';
import { taskAPI } from '../services/api';
import '../styles/TaskForm.css';

function TaskForm({ users, onTaskAdded }) {
  const [title, setTitle] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState('Backlog');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    setLoading(true);
    try {
      await taskAPI.createTask(title, assignedTo || null, status);
      setTitle('');
      setAssignedTo('');
      setStatus('Backlog');
      onTaskAdded();
    } catch (err) {
      setError(err.response?.data?.error || 'Error creating task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form task-form">
      <div className="form-group">
        <label>Task Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label>Assign To (Optional)</label>
        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          disabled={loading}
        >
          <option value="">Unassigned</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          disabled={loading}
        >
          <option value="Backlog">Backlog</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      {error && <p className="error-message">{error}</p>}
      <button type="submit" disabled={loading || users.length === 0}>
        {loading ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
}

export default TaskForm;
