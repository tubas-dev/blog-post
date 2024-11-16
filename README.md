# Blog Dashboard Project

A React-based project that displays a list of top stories from the Hacker News API. The project features authentication and private routing for secure access to the dashboard.

## Features

- **Password-Protected Routes**: 
  - The `dashboard` and `post?id` routes are private and require authentication.
- **Top Stories from Hacker News**:
  - Fetches and displays the top 10 stories from the Hacker News API.
- **Interactive UI**:
  - Users can view the list of stories in a user-friendly grid layout.
- **Error Handling**:
  - Displays a toast notification when an error occurs while fetching data.

## Tech Stack

- **React**: Frontend framework.
- **Material-UI (MUI)**: UI components for styling and layout.
- **React Router**: For routing and private route handling.
- **TypeScript**: For static type checking.
- **Hacker News API**: Public API to fetch top stories.


## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/tubas-dev/blog-post.git
   cd blog-post

## Available Scripts

In the project directory, you can run:

### `npm start`
Launches the test runner in the interactive watch mode.
### `npm test`
Builds the app for production to the `build` folder.
### `npm run build`
