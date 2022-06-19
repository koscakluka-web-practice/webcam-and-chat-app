import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { MediaProvider } from './contexts/SocketContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MediaProvider>
      <App />
    </MediaProvider>
  </React.StrictMode>
);
