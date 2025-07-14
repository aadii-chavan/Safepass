import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AuthPage } from './components/Auth/AuthPage';
import { Dashboard } from './components/Dashboard/Dashboard';
import { PublicProfile } from './components/PublicProfile/PublicProfile';
import { useAuth } from './contexts/AuthContext';

const AppContent: React.FC = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading SafePass...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/u/:profileId" element={<PublicProfile />} />
      <Route 
        path="/" 
        element={currentUser ? <Dashboard /> : <AuthPage />} 
      />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <AppContent />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;