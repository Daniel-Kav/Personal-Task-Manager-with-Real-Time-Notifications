import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [ error, setError] = useState<string |null>(null);
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Password does not match');
      return
    }
    // Send a POST request to your Django API
    try{
      const response = await axios.post('http://localhost:8080/api/register',{
        username, password}
      );

      if (response.status === 200) {
        navigate('/login')
      }
    } catch (error) {
      console.error('registration failed ',error);
      setError('Registration failed. Please try again')
    }
    console.log('Registering with', username, email, password);
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label >confirmPassword</label>
          <input 
            type="text"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
