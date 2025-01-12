import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';

import './App.css';

import Login from './pages/login';
import { AuthContext } from './context/authContext';
import BoardView from './pages/board-view';
import React from 'react';
import Dashboard from './pages/nav';
import { TaskManager } from './components/task-manager';

const queryClient = new QueryClient();

function App() {
  const { isAuthenticated } = React.useContext(AuthContext);
  return (
      <QueryClientProvider client={queryClient}>
        {!isAuthenticated ? <TaskManager /> : <Login />}
      </QueryClientProvider>
  );
}

export default App;
