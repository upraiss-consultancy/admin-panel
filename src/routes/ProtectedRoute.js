import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
const ProtectedRoute = ({ component: Component }) => {
    const navigate = useNavigate()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    useEffect(() => {
        const token = localStorage.getItem('token');
        const expiry = localStorage.getItem('expiry')
        if (token) {
            if (new Date().getTime() < new Date(expiry).getTime()) {
                setIsAuthenticated(true);
            } else {
                localStorage.removeItem('token');
                setIsAuthenticated(false);
                navigate('/auth/login')
            }
        } else {
            setIsAuthenticated(false);
            navigate('/auth/login')
        }
    }, [localStorage.getItem('token')])
    console.log(isAuthenticated , "isAuthenticated")

    return isAuthenticated &&
        Component
}

export default ProtectedRoute;