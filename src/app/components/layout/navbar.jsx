"use client"
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const router = useRouter();

    const { authUser, isAuthenticated, logout } = useAuth();
    console.log(authUser)

    const handleLogout = async (e) => {
        e.preventDefault();

        try {
            await logout();
            await router.push('/login');
        } catch (error) {

        }
    }

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="flex-none">
                {isAuthenticated ? (
                    <div>
                        <p>Welcome, {authUser.name}
                        <button onClick={handleLogout} className="ml-2 btn btn-accent">Logout</button></p>
                    </div>
                ) : (
                    <p>Please log in.</p>
                )}
            </div>
        </div>
)
    ;
};

export default Navbar;