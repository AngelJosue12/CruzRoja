import React from 'react'
import ReactDOM from 'react-dom';
import App from './App.jsx'
import { AuthProvider } from './Components/Contexts/AuthContexts.jsx';
ReactDOM.render(
    <React.StrictMode>
      <AuthProvider>
        
        <App />
      </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );