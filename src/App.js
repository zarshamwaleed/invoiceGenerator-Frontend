import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { ThemeProvider } from './context/ThemeContext';

// Components
import Navbar from "./components/Navbar";
import SigninHomepage from './components/SignedHomePage';
import SignedInNavbar from "./components/SignedInNavbar";
import HomePage from "./components/HomePage";
import HelpPage from "./components/HelpPage";
import ReleaseNotes from "./components/ReleaseNotes";
import InvoicingGuide from "./components/InvoicingGuide";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import APIDocumentation from './components/APIDoc';
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsService from './components/TermsService';
import ThankYou from './components/ThankYou';
import CreditNote from './components/CreditNote';
import Quote from './components/QuoteTemplate';
import Purchase from './components/PurchaseOrder';
import History from "./components/History";
import Upgrade from "./components/Upgrade";
import MyInvoices from './components/MyInvoices';
// import Settings from "./components/Settings";
import DeveloperSettings from './components/DeveloperSettings';
import InvoicePage from './components/InvoicePage';

import { InvoiceProvider, InvoiceContext } from './context/InvoiceContext';

/* ✅ ProtectedRoute Component */
function ProtectedRoute({ isSignedIn, children }) {
  if (!isSignedIn) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}

// ✅ AppLayout defined separately to use hooks
function AppLayout({ isSignedIn, user, handleSignOut, handleSignIn }) {
  const { resetInvoiceData } = useContext(InvoiceContext);
  const navigate = useNavigate();

  const handleNewInvoice = () => {
    resetInvoiceData();
    navigate('/', { replace: true });
  };

  return (
    <>
      {isSignedIn ? (
        <SignedInNavbar
          onSignOut={handleSignOut}
          onNewInvoice={handleNewInvoice}
          userName={user?.name || "User"}
          email={user?.email || ""}
        />
      ) : (
        <Navbar />
      )}

      <Routes>
        {/* ✅ If signed in → show SigninHomepage instead of HomePage */}
        <Route path="/" element={isSignedIn ? <SigninHomepage /> : <HomePage />} />

        {/* Public Pages */}
        <Route path="/help" element={<HelpPage />} />
        <Route path="/release-notes" element={<ReleaseNotes />} />
        <Route path="/guide" element={<InvoicingGuide />} />
        <Route path="/signin" element={<SignIn onSignIn={handleSignIn} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/apidoc" element={<APIDocumentation />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsService />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/credit-note-template" element={<CreditNote />} />
        <Route path="/quote-template" element={<Quote />} />
        <Route path="/purchase-order-template" element={<Purchase />} />
        <Route path="/history" element={<History />} />
        <Route path="/developer-settings" element={<DeveloperSettings />} />

        {/* ✅ Protected Pages */}
        <Route
          path="/signinHomepage"
          element={
            <ProtectedRoute isSignedIn={isSignedIn}>
              <SigninHomepage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-invoices"
          element={
            <ProtectedRoute isSignedIn={isSignedIn}>
              <MyInvoices />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upgrade"
          element={
            <ProtectedRoute isSignedIn={isSignedIn}>
              <Upgrade />
            </ProtectedRoute>
          }
        />

        <Route
          path="/view-invoice/:invoiceNumber"
          element={
            <ProtectedRoute isSignedIn={isSignedIn}>
              <InvoicePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (token && userData) {
        setIsSignedIn(true);
        setUser(JSON.parse(userData));
      }
      setLoading(false);
    };
    checkAuthStatus();
  }, []);

  const handleSignIn = async (email, password, userData) => {
    try {
      const mockToken = "mock-auth-token-" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify({
        name: userData?.name || email.split('@')[0],
        email: email
      }));
      setIsSignedIn(true);
      setUser({
        name: userData?.name || email.split('@')[0],
        email: email
      });
      return true;
    } catch (error) {
      console.error("Sign in error:", error);
      return false;
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsSignedIn(false);
    setUser(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <InvoiceProvider>
        <Router>
          <AppLayout 
            isSignedIn={isSignedIn} 
            user={user} 
            handleSignOut={handleSignOut}
            handleSignIn={handleSignIn}
          />
        </Router>
      </InvoiceProvider>
    </ThemeProvider>
  );
}
