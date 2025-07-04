import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../../appwrite/auth'
import { login } from '../../store/authSlice'
import { Input, Logo } from '../index'

function SignUp() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)
    const [showVerifyMsg, setShowVerifyMsg] = React.useState(false);
    const signUp = async (data) => {
        setError("");
        setIsLoading(true);
        try {
            const response = await authService.createAccount(data);
            if (response) {
                await authService.login({ email: data.email, password: data.password });
                await authService.sendVerificationEmail(window.location.origin + '/verify');
                setShowVerifyMsg(true);
                // Optionally log out the user to force verification before login
                // await authService.logout();
                return;
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-white border border-purple-200 shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col items-center">
                <div className="flex flex-col items-center mb-6">
                    <Logo width="60px" />
                    <h2 className="text-2xl font-extrabold text-gray-900 mt-2">Create your MegaBlog account</h2>
                </div>
                {showVerifyMsg ? (
                  <div className="text-center text-green-700 font-semibold py-8">
                    Account created!<br />A verification link has been sent to your email.<br />Please verify your email to continue.
                  </div>
                ) : (
                <form onSubmit={handleSubmit(signUp)} className="w-full mt-2 space-y-4">
                    <Input
                        label="Full Name"
                        type="text"
                        placeholder="Enter your name"
                        className="bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                        {...register('name', { required: true, minLength: 3 })}
                    />
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        className="bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                        {...register('email', { required: true })}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        className="bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                        {...register('password', { required: true, minLength: 6 })}
                    />
                    {error && <div className="text-red-500 text-sm text-center font-medium">{error}</div>}
                    <button
                        type="submit"
                        className="w-full bg-black text-white font-bold py-2 rounded-lg shadow hover:bg-gray-900 transition-all"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
                )}
                <div className="w-full flex flex-col gap-2 mt-6">
                  <button
                    type="button"
                    onClick={() => authService.account.createOAuth2Session('google', window.location.origin, window.location.origin)}
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-gray-300 bg-white text-gray-800 font-semibold shadow hover:bg-gray-50 transition-all cursor-pointer"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C35.64 2.36 30.18 0 24 0 14.82 0 6.71 5.82 2.69 14.09l7.98 6.19C12.13 13.6 17.62 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.66 7.04l7.19 5.6C43.98 37.36 46.1 31.44 46.1 24.55z"/><path fill="#FBBC05" d="M10.67 28.28c-1.04-3.1-1.04-6.46 0-9.56l-7.98-6.19C.9 16.36 0 20.06 0 24c0 3.94.9 7.64 2.69 11.47l7.98-6.19z"/><path fill="#EA4335" d="M24 48c6.18 0 11.36-2.05 15.15-5.57l-7.19-5.6c-2.01 1.35-4.59 2.15-7.96 2.15-6.38 0-11.87-4.1-13.33-9.59l-7.98 6.19C6.71 42.18 14.82 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></g></svg>
                    Continue with Google
                  </button>
                </div>
                <div className="mt-6 text-center">
                    <Link to="/login" className="text-black underline hover:text-gray-700 transition-all">
                        Already have an account? <span className="font-semibold">Login here</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp
