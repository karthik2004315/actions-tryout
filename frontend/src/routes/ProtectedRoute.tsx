import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"
import {useAuth} from "../context/AuthContext"

const ProtectedRoute = ({ children }: any) => {
    const {token,setToken} = useAuth()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const verifyUser = async() => {
            if(token){
                setLoading(false);
                return;
            }

            try{
                const res = await axios.get("/api/auth/refresh", {
                    withCredentials: true
                });
                setToken(res.data.accessToken)
            }catch{
                setToken(null)
            }finally{
                setLoading(false)
            }
        }

        verifyUser()
    }, [token, setToken]);

    if(loading) return <div className="p-6"> Checking authentication</div>
    if(!token) return <Navigate to='/login' />

    return children;
}

export default ProtectedRoute;