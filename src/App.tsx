import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Navbar from './components/Navigation/Navbar';
import HomePage from './pages/HomePage';
import Details from './pages/DetailsPage';
import DashboardPage from './pages/Dashboard';
import AuthRoute from './components/Auth/AuthRoute';
import { AuthProvider, useAuth } from './context/AuthContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4b0082',
    },
    secondary: {
      main: '#ff4081',
    },
  },
});
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};
const App: React.FC = () => (
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar /> {/* Always visible Navbar */}
        <Container maxWidth="lg" style={{ marginTop: '104px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Protected Routes */}
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/details/:id"
              element={
                <PrivateRoute>
                  <Details />
                </PrivateRoute>
              }
            />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  </AuthProvider>
);

export default App;
