import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import { Loginprovider } from './contexts/Logincontext.jsx'
import Dashboard from './components/Dashboard.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,

  },
  {

    path: '/Login',
    element: <Login />

  }, {
    path: 'Signup',
    element: <Signup />
  }, {
    path: 'Dashboard',
    element: <Dashboard />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Loginprovider>
      <RouterProvider router={router} />
    </Loginprovider>

  </React.StrictMode>,
)
