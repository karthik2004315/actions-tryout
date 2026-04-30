import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
    const { token } = useAuth();

    return (
        <div className="flex flex-col items-center justify-center h-[80vh] text-center px-6">
            <h1 className="text-4xl font-bold">Event Empire</h1>

            <p className="mt-4">
                A simple platform to create, manage, and track your events efficiently.
                Built with React, Node.js, Docker, and Nginx.
            </p>

            <div className="mt-6 space-x-4">
                {token ? (
                    <>
                        <Link
                            to="/dashboard"
                            className="bg-black text-white px-5 py-2 rounded"
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/create"
                            className="border px-5 py-2 rounded"
                        >
                            Create Event
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="bg-black text-white px-5 py-2 rounded"
                        >
                            Login
                        </Link>

                        <Link
                            to="/signup"
                            className="border px-5 py-2 rounded"
                        >
                            Signup
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;