import React ,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);


  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>You have successfully logged in!</p>
    </div>
  );
};

export default Dashboard;
