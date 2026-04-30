import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            await axios.post("/api/auth/register", { email, password });
            alert("Signup successful");
            navigate("/login");
        } catch (err) {
            alert("Signup failed");
        }
    };

    return (
        <div className="p-6">
            <h2>Signup</h2>

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
                onClick={handleSignup}
            >
                Signup
            </button>
        </div>
    );
};

export default Signup;