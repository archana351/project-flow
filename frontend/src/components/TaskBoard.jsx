import { taskAPI } from '../services/api';
import '../styles/TaskBoard.css';

function TaskBoard({ tasks, users, onTaskUpdated }) {
  const statuses = ['Backlog', 'In Progress', 'Done'];

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const getUserName = (userId) => {
    const user = users.find(u => u._id === userId);
    return user ? user.name : 'Unassigned';
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const task = tasks.find(t => t._id === taskId);
      await taskAPI.updateTask(taskId, task.title, task.assignedTo?._id || null, newStatus);
      onTaskUpdated();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Delete this task?')) {
      try {
        await taskAPI.deleteTask(taskId);
        onTaskUpdated();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  return (
    <div className="task-board">
      {statuses.map((status) => (
        <div key={status} className="board-column">
          <h3 className="column-title">{status}</h3>
          <div className="tasks-container">
            {getTasksByStatus(status).length === 0 ? (
              <p className="no-tasks">No tasks</p>
            ) : (
              getTasksByStatus(status).map((task) => (
                <div key={task._id} className="task-card">
                  <h4>{task.title}</h4>
                  <p className="assigned-to">{getUserName(task.assignedTo?._id)}</p>
                  <div className="task-actions">
                    {status !== 'Done' && (
                      <button
                        className="next-btn"
                        onClick={() => {
                          const nextIndex = statuses.indexOf(status) + 1;
                          handleStatusChange(task._id, statuses[nextIndex]);
                        }}
                      >
                        Move →
                      </button>
                    )}
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteTask(task._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskBoard;
