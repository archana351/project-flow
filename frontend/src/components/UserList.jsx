import { userAPI } from '../services/api';
import '../styles/UserList.css';

function UserList({ users, onUserDeleted }) {
  const handleDelete = async (id) => {
    if (window.confirm('Delete this user?')) {
      try {
        await userAPI.deleteUser(id);
        onUserDeleted();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div className="user-list">
      <p className="count">Total: {users.length}</p>
      {users.length === 0 ? (
        <p className="empty-message">No users yet</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id} className="user-item">
              <div className="user-info">
                <strong>{user.name}</strong>
              </div>
              <button 
                onClick={() => handleDelete(user._id)}
                className="delete-btn"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserList;
