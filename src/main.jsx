import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'react-loading-skeleton/dist/skeleton.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import MarvelProvider from './components/marvelContext/MarvelProvider'
import UserProvider from './components/marvelContext/UserProvider'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MarvelProvider>
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
    </MarvelProvider>  
  </React.StrictMode>,
)
