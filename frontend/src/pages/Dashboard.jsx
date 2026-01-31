import { useState, useEffect } from 'react';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';
import TaskForm from '../components/TaskForm';
import TaskBoard from '../components/TaskBoard';
import { userAPI, taskAPI } from '../services/api';
import '../styles/Dashboard.css';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // Fetch users and tasks on mount and when refresh changes
  useEffect(() => {
    fetchUsers();
    fetchTasks();
  }, [refresh]);

  const fetchUsers = async () => {
    try {
      const response = await userAPI.getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await taskAPI.getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleUserAdded = () => {
    setRefresh(!refresh);
  };

  const handleTaskAdded = () => {
    setRefresh(!refresh);
  };

  const handleTaskUpdated = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="dashboard-container">
      <h1>Project Management Dashboard</h1>
      <div className="dashboard-content">
        {/* Left Panel - User Management */}
        <div className="left-panel">
          <h2>Users</h2>
          <UserForm onUserAdded={handleUserAdded} />
          <UserList users={users} onUserDeleted={handleUserAdded} />
        </div>

        {/* Right Panel - Task Management */}
        <div className="right-panel">
          <h2>Tasks</h2>
          <TaskForm users={users} onTaskAdded={handleTaskAdded} />
          <TaskBoard tasks={tasks} users={users} onTaskUpdated={handleTaskUpdated} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
