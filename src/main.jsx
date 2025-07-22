import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ContactList from './Components/Contacts/contactList'
import Navbar from './Components/Navbar/Navbar'
import ViewContact from './Components/Contacts/View-contacts'
import EditContact from './Components/Contacts/EditContact'
import App from './App'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
