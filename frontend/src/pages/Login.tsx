import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setToken } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(
                "/api/auth/login",
                { email, password },
                { withCredentials: true }
            );

            setToken(res.data.accessToken);
            navigate("/dashboard");
        } catch (err) {
            alert("Login failed");
        }
    };

    return (
        <div className="p-6">
            <h2>Login</h2>

            <input
                placeholder="Email"
                className="border p-2 block mt-2"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                placeholder="Password"
                type="password"
                className="border p-2 block mt-2"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                className="bg-black text-white px-4 py-2 mt-3"
                onClick={handleLogin}
            >
                Login
            </button>
        </div>
    );
};

export default Login;