import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

const isEmbedded = window.location.hash === '#embedded'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App embedded={isEmbedded} />
  </React.StrictMode>,
)
