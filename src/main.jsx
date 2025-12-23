import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home'
import './index.css'
import './App.css'
import { loadGA } from './lib/analytics';


loadGA();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
)
