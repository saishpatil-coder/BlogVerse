import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../../appwrite/auth'
import { login } from '../../store/authSlice'
import { Input, Logo } from '../index'

function SignUp()
{
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, watch } = useForm()
    const [error, setError] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)
    const signUp = async (data) => {
        console.log("Signing Up : ", data);
        setError("");
        setIsLoading(true);
        try {
            const response = await authService.createAccount(data);
            if (response) {
                alert("\u2705 Account created successfully! Please login to continue.");

                navigate('/login', {
                    state: {
                        successMsg: "Account created successfully. Login to continue.",
                        email: data.email,
                        password: data.password
                    }
                });
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div
            className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
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
                    className='text-center text-2xl font-bold'>Sign Up To create Account </h2>
                <p
                    className='text-red-500 mb-4'>
                    <Link to='/login' className='text-blue-500 hover:underline'>
                        Already have an account? Login here
                    </Link>
                </p>
                {error && <p className='text-red-500 mb-4'>{error}</p>}
                <form onSubmit={handleSubmit(signUp)} className='mt-8'>
                    <div className='mb-4'>
                        <Input
                            label='Full Name'
                            type='text'
                            placeholder='Enter your name'
                            {...register('name', { required: true, minLength: 3 })}>
                        </Input>
                    </div>
                    <div className='mb-4'>
                        <Input
                            label='Email'
                            type='email'
                            placeholder='Enter your email'
                            {...register('email', { required: true })}>
                        </Input>
                    </div>
                    <div className='mb-4'>
                        <Input
                            label='Password'
                            type='password'
                            placeholder='Enter your password'
                            {...register('password', { required: true, minLength: 6 })}>
                        </Input>
                    </div>

                    <button
                        type='submit'
                        className='w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignUp
