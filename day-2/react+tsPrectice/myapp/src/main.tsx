import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Handel from './handel.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Handel />
  </StrictMode>,
)
