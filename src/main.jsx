import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { AllRoute } from './routes/AllRoute'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={AllRoute}></RouterProvider>
  </StrictMode>,
)
