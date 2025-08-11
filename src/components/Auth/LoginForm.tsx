import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, Mail, Lock, UserPlus, LogIn, Heart, Users, QrCode, Eye } from 'lucide-react';

interface LoginFormProps {
  onToggleMode: () => void;
  isSignUp: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onToggleMode, isSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showReset, setShowReset] = useState(false); // <-- New state
  const [resetEmail, setResetEmail] = useState(''); // <-- New state
  const [resetLoading, setResetLoading] = useState(false); // <-- New state
  const [resetMessage, setResetMessage] = useState(''); // <-- New state

  const { login, signup, resetPassword } = useAuth(); // <-- Add resetPassword

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (isSignUp && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      
      if (isSignUp) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  // Password reset handler
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetMessage('');
    setError('');
    setResetLoading(true);
    try {
      await resetPassword(resetEmail);
      setResetMessage('Password reset email sent! Check your inbox.');
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl mb-6 shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-3">SafePass</h1>
            <p className="text-slate-600 text-lg font-medium mb-4">
              {isSignUp ? 'Create your emergency profile' : 'Access your emergency profile'}
            </p>
            
            {/* Feature highlights */}
            <div className="flex justify-center space-x-6 mb-6">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mb-2">
                  <Heart className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-xs text-slate-500 font-medium">Medical Info</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-2">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-xs text-slate-500 font-medium">Emergency Contacts</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center mb-2">
                  <QrCode className="w-5 h-5 text-indigo-600" />
                </div>
                <span className="text-xs text-slate-500 font-medium">QR Access</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-4 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-slate-50/50 text-slate-900 placeholder-slate-400"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-12 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-slate-50/50 text-slate-900 placeholder-slate-400"
                  placeholder="Enter your password"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <Eye className="w-5 h-5" /> : <Eye className="w-5 h-5" style={{ opacity: 0.5 }} />}
                </button>
              </div>
            </div>
            {isSignUp && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-14 pr-12 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-slate-50/50 text-slate-900 placeholder-slate-400"
                    placeholder="Confirm your password"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    tabIndex={-1}
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  >
                    {showConfirmPassword ? <Eye className="w-5 h-5" /> : <Eye className="w-5 h-5" style={{ opacity: 0.5 }} />}
                  </button>
                </div>
              </div>
            )}
            {error && (
              <div className="text-red-600 text-sm font-medium text-center">{error}</div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-emerald-700 hover:to-blue-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {isSignUp ? <UserPlus className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
                  <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                </>
              )}
            </button>
          </form>

          {/* Forgot Password Link & Reset Form */}
          {!isSignUp && (
            <div className="mt-4 text-center">
              {!showReset ? (
                <button
                  type="button"
                  className="text-blue-600 hover:underline text-sm font-medium"
                  onClick={() => {
                    setShowReset(true);
                    setResetMessage('');
                    setError('');
                    setResetEmail(email); // prefill if user typed email
                  }}
                >
                  Forgot Password?
                </button>
              ) : (
                <form onSubmit={handleResetPassword} className="mt-2 space-y-2">
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={e => setResetEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-slate-50/50 text-slate-900 placeholder-slate-400"
                    placeholder="Enter your email"
                    required
                  />
                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 disabled:opacity-50"
                  >
                    {resetLoading ? 'Sending...' : 'Send Reset Email'}
                  </button>
                  <button
                    type="button"
                    className="w-full text-xs text-slate-500 hover:underline mt-1"
                    onClick={() => setShowReset(false)}
                  >
                    Cancel
                  </button>
                  {resetMessage && <div className="text-green-600 text-xs text-center mt-1">{resetMessage}</div>}
                  {error && <div className="text-red-600 text-xs text-center mt-1">{error}</div>}
                </form>
              )}
            </div>
          )}

          <div className="mt-6 text-center">
            <button
              onClick={onToggleMode}
              className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors duration-200"
            >
              {isSignUp 
                ? 'Already have an account? Sign in' 
                : 'Need an account? Sign up'
              }
            </button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-center text-xs text-slate-500">
              Secure emergency identity storage for first responders
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};