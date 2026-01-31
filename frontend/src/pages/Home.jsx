import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>SDLC Project Management</h1>
        <p>Organize your tasks using SDLC stages</p>
        <button onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
      </div>
    </div>
  );
}

export default Home;
