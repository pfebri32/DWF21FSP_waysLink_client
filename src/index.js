import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Contexts.
import { UserContextProvider } from './contexts/userContext';

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
