import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Logo } from '../components';
import { AuthService } from '../appwrite/auth';

const authService = new AuthService();

export default function Verify() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const userId = searchParams.get('userId');
    const secret = searchParams.get('secret');
    if (!userId || !secret) {
      setStatus('error');
      setMessage('Invalid verification link.');
      return;
    }
    authService.account.updateVerification(userId, secret)
      .then(() => {
        setStatus('success');
        setMessage('Email verified! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      })
      .catch(() => {
        setStatus('error');
        setMessage('Verification failed. The link may be invalid or expired.');
      });
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-white border border-blue-200 shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col items-center">
        <Logo width="60px" />
        <h2 className="text-2xl font-extrabold text-gray-900 mt-4 mb-2 text-center">Email Verification</h2>
        <div className={`text-center text-lg font-medium py-8 ${status === 'success' ? 'text-green-700' : status === 'error' ? 'text-red-600' : 'text-gray-700'}`}>{message}</div>
      </div>
    </div>
  );
} 