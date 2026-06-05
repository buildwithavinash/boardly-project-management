import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { ProjectsProvider } from './context/ProjectsContext.jsx'
import { TasksProvider } from './context/TasksContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
    <ToastProvider>
    <AuthProvider>
    <ProjectsProvider>
    <TasksProvider>
    <App />
    </TasksProvider>
    </ProjectsProvider>
    </AuthProvider>
    </ToastProvider>
  </BrowserRouter>
  </StrictMode>
)
