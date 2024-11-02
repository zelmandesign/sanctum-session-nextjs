"use client"
import { useAuth } from '@/app/context/AuthContext';

const Navbar = () => {
    const { authUser, isAuthenticated, logout } = useAuth();
    console.log(authUser)

    return (
        <nav>
            {isAuthenticated ? (
                <div>
                    <p>Welcome, {authUser[0].name}</p>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <p>Please log in.</p>
            )}
        </nav>
    );
};

export default Navbar;