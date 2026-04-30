import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { token, setToken } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        setToken(null);
        navigate("/");
    };

    return (
        <nav className="bg-black text-white p-4 flex justify-between items-center">
            <h1 className="text-lg font-bold">Event Empire</h1>

            <div className="space-x-4">
                <Link to="/">Home</Link>

                {token ? (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/create">Create</Link>

                        <button
                            onClick={handleLogout}
                            className="bg-red-500 px-3 py-1 rounded"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
}