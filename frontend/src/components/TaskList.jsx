import React from 'react';
import './TaskList.css';

function TaskList({ tasks, users }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return '#28a745';
      case 'In Progress':
        return '#ffc107';
      case 'Pending':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  return (
    <div className="task-list">
      <h3>Tasks ({tasks.length})</h3>
      {tasks.length === 0 ? (
        <p className="empty-message">No tasks added yet</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <div className="task-header">
                <div className="task-title">{task.title}</div>
                <span
                  className="task-status"
                  style={{ backgroundColor: getStatusColor(task.status) }}
                >
                  {task.status}
                </span>
              </div>
              <div className="task-user">Assigned to: {task.assignedUser}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
