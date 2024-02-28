import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './contextApi/authContext'
import { DarkModeContextProvider } from './contextApi/Darkmode'
import './index.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <AuthContextProvider>
        <DarkModeContextProvider>
          <App/>
        </DarkModeContextProvider>  
      </AuthContextProvider> 
  </React.StrictMode>
);
