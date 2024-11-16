// src/components/BlogList.tsx

import React, { useEffect, useState } from 'react';
import BlogItem from './BlogItems';
import useFetch from '../../hooks/useFetch';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert'; // For the toast message
import './Styles.css';

type Post = {
  id: number;
  title: string;
  author: string;
};

const BlogList: React.FC = () => {
  const { data: topStories, loading, error } = useFetch<number[]>(
    'https://hacker-news.firebaseio.com/v0/beststories.json'
  );

  const [posts, setPosts] = useState<Post[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (topStories && topStories.length > 0) {
      const fetchStories = async () => {
        const storyPromises = topStories.slice(0, 10).map(id =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then(res => res.json())
            .then(story => ({
              id: story.id,
              title: story.title,
              author: story.by,
            }))
        );
        const results = await Promise.all(storyPromises);
        setPosts(results);
      };
      fetchStories();
    }
  }, [topStories]);

  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="lg">
      {loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}
      {!loading && posts.length === 0 && !error && (
        <Typography variant="h6" align="center" color="textSecondary" mt={4}>
          No posts available
        </Typography>
      )}
      <Grid container spacing={4}>
        {posts.map(post => (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            <BlogItem post={post} />
          </Grid>
        ))}
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default BlogList;
