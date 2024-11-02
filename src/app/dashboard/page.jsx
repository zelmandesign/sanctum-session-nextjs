"use client";

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const DashboardPage = () => {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/login'); // Redirect to login if not authenticated and not loading
        }
    }, [isAuthenticated, loading, router]);

    if (loading) {
        return <p>Loading...</p>; // Show a loading indicator while checking authentication
    }

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
};

export default DashboardPage;