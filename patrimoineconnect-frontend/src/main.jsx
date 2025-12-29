import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext'
import { OpportunitesProvider } from './context/OpportunitesContext'
import { UsersProvider } from './context/UsersContext'
import { ProfileProvider } from './context/ProfileContext'
import { AdminProvider } from './context/AdminContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <OpportunitesProvider>
        <UsersProvider>
          <ProfileProvider>
            <AdminProvider>
              <App />
            </AdminProvider>
          </ProfileProvider>
        </UsersProvider>
      </OpportunitesProvider>
    </AuthProvider>
  </StrictMode>,
)

