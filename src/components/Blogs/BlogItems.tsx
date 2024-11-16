// src/components/BlogItem.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import BlogLogo from '../../assets/images/blog-logo.jpg';
import './Styles.css';

type Post = {
  id: number;
  title: string;
  author: string;
  imageUrl?: string;
};

type BlogItemProps = {
  post: Post;
};

const BlogItem: React.FC<BlogItemProps> = ({ post }) => (
  <Card variant="outlined" className="blog-card">
    {/* Wrap CardMedia with Link for clickable image */}
    <Link to={`/details/${post.id}`} style={{ textDecoration: 'none' }}>
      <CardMedia
        className="blog-media"
        component="img"
        height="140"
        image={post.imageUrl || BlogLogo}
        alt={post.title}
      />
    </Link>
    <CardContent className="blog-card-content">
      {/* Wrap Typography with Link for clickable title */}
      <Link to={`/details/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Typography variant="subtitle1" component="h2" gutterBottom>
          {post.title}
        </Typography>
      </Link>
      <Typography color="textSecondary">Author: {post.author}</Typography>
    </CardContent>
    <Box className="blog-button-container" p={2}>
      <Button
        component={Link}
        to={`/details/${post.id}`}
        variant="contained"
        color="primary"
        size="small"
      >
        Read More
      </Button>
    </Box>
  </Card>
);

export default BlogItem;
