import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import authService from '../../appwrite/auth'
import { login as authLogin } from '../../store/authSlice'
import { Button, Input, Logo } from '../index'
import { useForm } from 'react-hook-form'

function Login()
{
    const navigate = useNavigate()
    const location = useLocation();
    const dispatch = useDispatch()
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            email: location.state?.email || '',
            password: location.state?.password || ''
        }
    })
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    // Ensure autofill if navigating from signup
    React.useEffect(() => {
        if (location.state?.email) setValue('email', location.state.email);
        if (location.state?.password) setValue('password', location.state.password);
    }, [location.state, setValue]);

    const login = async (data) =>
    {
        setError("")
        setIsLoading(true)
        try {
            const response = await authService.login(data)
            if (response) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(authLogin(userData))
                    navigate('/')
                }
            } 
        } catch (err) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div
            className='flex flex-col items-center justify-center min-h-screen bg-gray-100'
        >
            <div

                className='bg-white shadow-md rounded-lg p-8 w-full max-w-sm'>
                <div
                    className='flex items-center justify-center mb-6'>
                    <span
                        className='text-2xl font-bold text-gray-800'>
                        <Logo width='100%' />
                    </span>

                </div>
                <h2
                    className='text-2xl font-bold text-gray-800 mb-6 text-center'>
                    Login to your account
                </h2>
                <p>
                    <Link to='/signup' className='text-blue-500 hover:underline'>
                        Don't have an account? Register here
                    </Link>
                </p>
                <p>
                    {error && <span className='text-red-500'>{error}</span>
                    }

                </p>

                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div>
                        <Input
                        label='Email'
                        placeholder='Enter your email'
                        type='email'
                        {...register('email', { required: true ,validate:{
                            matchPattern: (value) => {
                                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                return emailPattern.test(value) || "Invalid email format";
                            }
                        }})}
                        />
                        <Input
                        label='Password'
                        placeholder='Enter your password'  
                        type='password'
                        {...register('password', { required: true, minLength: 6 })} 
                        />
                        <Button type='submit' className='w-full' disabled={isLoading}>
                            {isLoading ? 'Logging in...' : 'Sign In'}
                        </Button>
                    </div>
                     
                </form>
            </div>

        </div>
    )
}

export default Login
