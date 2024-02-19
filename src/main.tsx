import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './components/Theme.Provider.tsx'
import { Toaster } from "@/components/ui/toaster"
import { NavbarProvider } from './context/ResponsiveNabBar.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
    <NavbarProvider>
    <App />
    <Toaster/>
    </NavbarProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
