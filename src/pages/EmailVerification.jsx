import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Logo } from '../components';
import { AuthService } from '../appwrite/auth';
import { login } from '../store/authSlice';

const authService = new AuthService();

export default function EmailVerification() {
  const user = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const resendVerification = async () => {
    setLoading(true);
    setMessage('');
    setError('');
    try {
      await authService.sendVerificationEmail('http://localhost:5173/verify');
      setMessage('✅ Verification email sent! Please check your inbox.');
    } catch (err) {
      setError('❌ Failed to send verification email. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const refreshStatus = async () => {
    setLoading(true);
    setMessage('');
    setError('');
    try {
      const refreshedUser = await authService.getCurrentUser();
      dispatch(login(refreshedUser));
      if (refreshedUser.emailVerification) {
        setMessage('✅ Email verified! Redirecting...');
        setTimeout(() => navigate('/add-post'), 1500);
      } else {
        setError('❌ Email not verified yet. Please check your inbox again.');
      }
    } catch (err) {
      setError('❌ Failed to refresh status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-blue-50 px-4">
      <div className="bg-white border border-blue-200 shadow-2xl rounded-3xl p-8 w-full max-w-md flex flex-col items-center">
        <Logo width="60px" />
        <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-3 text-center">
          Email Verification Required
        </h2>
        <p className="text-gray-600 text-center text-sm mb-4">
          To continue using MegaBlog features like posting, please verify your email. <br />
          Click the link sent to your inbox.
        </p>

        {message && <div className="text-green-700 font-medium text-sm text-center mb-2">{message}</div>}
        {error && <div className="text-red-600 font-medium text-sm text-center mb-2">{error}</div>}

        <Button
          onClick={resendVerification}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium mb-2"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Resend Verification Email'}
        </Button>

        <Button
          onClick={refreshStatus}
          className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium"
          disabled={loading}
        >
          {loading ? 'Checking...' : 'Refresh Verification Status'}
        </Button>
      </div>
    </div>
  );
}
