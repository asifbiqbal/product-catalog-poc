import React, { useState } from 'react';
import { Button, TextField, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'user' && password === '1234') {
      alert('Login successful');
      // navigate('/create-product');
      navigate('/products');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Paper elevation={3} style={{ padding: 30, width: 300, margin: '100px auto' }}>
      <Typography variant="h6" gutterBottom>Login</Typography>
      <TextField
        fullWidth
        label="Username"
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button fullWidth variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </Paper>
  );
}

export default Login;
