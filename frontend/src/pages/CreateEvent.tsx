import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const CreateEvent = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const { token } = useAuth();

    const handleSubmit = async () => {
        try {
            await axios.post(
                "/api/events",
                { title, description },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            alert("Event created");
        } catch (err) {
            alert("Failed to create event");
        }
    };

    return (
        <div className="p-6">
            <h2>Create Event</h2>

            <input
                placeholder="Title"
                className="border p-2 mt-2 block"
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                placeholder="Description"
                className="border p-2 mt-2 block"
                onChange={(e) => setDescription(e.target.value)}
            />

            <button
                className="bg-black text-white px-4 py-2 mt-3"
                onClick={handleSubmit}
            >
                Create
            </button>
        </div>
    );
};

export default CreateEvent;