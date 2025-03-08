import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// intializing the browser router
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import { ConfigProvider } from './context/ConfigContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider>
    <Router>
       <App />
    </Router>
    </ConfigProvider>
  </StrictMode>,
)
