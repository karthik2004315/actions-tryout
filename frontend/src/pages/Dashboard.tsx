import { useState, useEffect } from "react";
import axios from 'axios'
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const [events, setEvents] = useState<any[]>([]);
    const { token } = useAuth()

    useEffect(() => {
        if (!token) return;

        axios.get("/api/events", {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(res => setEvents(res.data))
    }, [token]);

    return(
        <div className="p-6">
            <h2>Events</h2>

            {events.map((event, i) => (
                <div key={i} className="border p-3 mt-2">
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                </div>
            ))}
        </div>
    );
}

export default Dashboard;