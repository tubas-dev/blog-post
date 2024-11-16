import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useAuth } from '../context/AuthContext';

const HomePage: React.FC = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handlePasswordSubmit = () => {
    const correctPassword = "hackerNews";

    if (password === correctPassword) {
      login();
      navigate("/home", { replace: true });
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Typography variant="h3" gutterBottom>
        Welcome to Secure Blog Access
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Enter the password to access exclusive content
      </Typography>
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!error}
        helperText={error}
        style={{ marginBottom: '16px', width: '300px' }}
      />
      <Button variant="contained" color="primary" onClick={handlePasswordSubmit}>
        Submit
      </Button>
      {error && <Alert severity="error" style={{ marginTop: '16px' }}>{error}</Alert>}
    </Box>
  );
};

export default HomePage;
