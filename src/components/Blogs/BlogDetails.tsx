// src/components/BlogDetail.tsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Grid from '@mui/material/Grid';
import BlogLogo from '../../assets/images/blog-logo.jpg';
type StoryDetail = {
  id: number;
  title: string;
  by: string;
  url?: string;
  text?: string;
  imageUrl?: string; // Placeholder property if an image URL is available
};

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: story, loading, error } = useFetch<StoryDetail>(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Container>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Back to Blogs
      </Button>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box
            component="img"
            src={story?.imageUrl || BlogLogo}
            alt={story?.title}
            width="100%"
            borderRadius={1}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" component="h1" gutterBottom>
            {story?.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Author: {story?.by}
          </Typography>
          {story?.text ? (
            <Typography variant="body1" dangerouslySetInnerHTML={{ __html: story.text }} />
          ) : (
            <Typography variant="body1" color="textSecondary">
              Full content is not available.
            </Typography>
          )}
          {story?.url && (
            <Box mt={2}>
              <Typography variant="body1">
                <a href={story.url} target="_blank" rel="noopener noreferrer">
                  Read the full article
                </a>
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default BlogDetail;
