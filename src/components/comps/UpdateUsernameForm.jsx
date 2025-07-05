import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { login } from '../../store/authSlice';
import { Input, Button } from '../index';

function UpdateUsernameForm({ onClose }) {
    const user = useSelector((state) => state.auth.userData);
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: user?.name || ''
        }
    });
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const onSubmit = async (data) => {
        if (data.name === user?.name) {
            setError("New name must be different from current name");
            return;
        }

        setError("");
        setSuccess("");
        setIsLoading(true);

        try {
            const updatedUser = await authService.updateName(data.name);
            dispatch(login(updatedUser));
            setSuccess("Username updated successfully!");
            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (err) {
            setError(err.message || "Failed to update username");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Update Username</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input
                        label="New Username"
                        type="text"
                        placeholder="Enter new username"
                        className="bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                        {...register('name', { 
                            required: "Username is required",
                            minLength: {
                                value: 2,
                                message: "Username must be at least 2 characters"
                            },
                            maxLength: {
                                value: 50,
                                message: "Username must be less than 50 characters"
                            }
                        })}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name.message}</p>
                    )}

                    {error && (
                        <div className="text-red-500 text-sm text-center font-medium bg-red-50 p-2 rounded">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="text-green-600 text-sm text-center font-medium bg-green-50 p-2 rounded">
                            {success}
                        </div>
                    )}

                    <div className="flex gap-3 pt-2">
                        <Button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-gray-300 text-gray-700 hover:bg-gray-400"
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1 bg-black text-white hover:bg-gray-900"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Updating...' : 'Update Username'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateUsernameForm;