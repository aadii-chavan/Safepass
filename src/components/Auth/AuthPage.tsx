import React, { useState } from 'react';
import { LoginForm } from './LoginForm';

export const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <LoginForm 
      onToggleMode={() => setIsSignUp(!isSignUp)} 
      isSignUp={isSignUp} 
    />
  );
};