import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';
// ✅ Import Google OAuth Provider
import { GoogleOAuthProvider } from '@react-oauth/google';

// ✅ Import AuthProvider (we’ll create it)
import { AuthProvider } from './context/AuthContext';

// ✅ Your Google Client ID
const GOOGLE_CLIENT_ID =
  '369192783250-50g1jib6u4nk2617fbg9elp636k0ccuc.apps.googleusercontent.com';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* ✅ Wrap GoogleOAuthProvider first */}
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {/* ✅ Wrap AuthProvider to provide user state */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// Optional performance analytics
reportWebVitals();
