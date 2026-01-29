import { useState } from 'react';
import './App.css'
import OAuthConnect from '../components/OAuthConnect';
import OAuthCallback from '../components/OAuthCallback';
import AdForm from '../components/AdForm';

function App() {
  const [token,setToken] = useState(JSON.parse(localStorage.getItem('tiktok-token'))
)

const isCallback = window.location.pathname === '/oauth-callback'

if(!token && isCallback){
  return <OAuthCallback onSuccess={setToken} />
}

if(!token){
  return <OAuthConnect />
}


  return (
    <>
     <AdForm token={token} />
    </>
  )
}

export default App
