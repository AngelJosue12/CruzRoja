import React from 'react';
import { createRoot } from 'react-dom'; // Importa createRoot desde react-dom en lugar de ReactDOM
import App from './App.jsx';
import { AuthProvider } from './Components/Contexts/AuthContexts.jsx';
import './App.css'
//Import Router
 import Router from './Router/Router'
// Utiliza createRoot en lugar de ReactDOM.render
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <Router/>
    </AuthProvider>
  </React.StrictMode>
);
