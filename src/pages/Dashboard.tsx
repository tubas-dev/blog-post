import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BlogList from '../components/Blogs/BlogList';

const DashboardPage: React.FC = () => {

  useEffect(() => {
    window.history.pushState(null, '', window.location.href);

    const handleBackButton = (event: PopStateEvent) => {
      window.history.pushState(null, '', window.location.href);
    };
    window.addEventListener('popstate', handleBackButton);
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={4}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Protected Dashboard
      </Typography>
      <Typography variant="body1" gutterBottom>
        Here are the latest blog posts:
      </Typography>
      <Box mt={4} width="100%">
        <BlogList />
      </Box>
    </Box>
  );
};

export default DashboardPage;
