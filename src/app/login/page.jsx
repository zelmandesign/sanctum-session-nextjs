"use client";
import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const router = useRouter();
    const { login } = useAuth();
    const [formState, setFormState] = useState({
        username: '',
        password: '',
        errors: {},
    });

    // Handle input change
    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
            errors: { ...formState.errors, [e.target.name]: '' },
        });
    };

    // Handle form submission
    const handleLogin = async (e) => {
        e.preventDefault();

        // Clear previous errors
        const errors = {};
        if (!formState.username) errors.username = "Username is required";
        if (!formState.password) errors.password = "Password is required";

        if (Object.keys(errors).length > 0) {
            setFormState({ ...formState, errors });
            return;
        }

        // Call login and handle potential errors
        try {
            await login(formState.username, formState.password);
            // Redirect or update UI after successful login if necessary
            router.push('/dashboard');
        } catch (error) {
            setFormState({
                ...formState,
                errors: { ...formState.errors, axios: error.message },
            });
        }
    };

    return (
        <form onSubmit={handleLogin} className="max-w-xs mx-auto">
            <div className="mb-3">
                <input
                    name="username"
                    type="text"
                    placeholder="username"
                    autoComplete="off"
                    value={formState.username}
                    onChange={handleChange}
                    className="input input-bordered w-full max-w-xs"
                />
                {formState.errors?.username && (
                    <div role="alert" className="alert alert-warning mt-2">
                        <span>{formState.errors.username}</span>
                    </div>
                )}
            </div>
            <div className="mb-3">
                <input
                    name="password"
                    type="password"
                    placeholder="password"
                    autoComplete="off"
                    value={formState.password}
                    onChange={handleChange}
                    className="input input-bordered w-full max-w-xs"
                />
                {formState.errors?.password && (
                    <div role="alert" className="alert alert-warning mt-2">
                        <span>{formState.errors.password}</span>
                    </div>
                )}
                {formState.errors?.axios && (
                    <div role="alert" className="alert alert-error mt-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 shrink-0 stroke-current"
                            fill="none"
                            viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>{formState.errors.axios}</span>
                    </div>
                )}
            </div>
            <button type="submit" className="btn">Sign In</button>
        </form>
    );
};

export default LoginPage;