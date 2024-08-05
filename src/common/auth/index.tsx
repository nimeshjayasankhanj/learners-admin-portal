import { createContext, useContext, useState, ReactNode } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface AuthContextType {
    isAuthenticated: string | null;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const auth = localStorage.getItem("access_token");
    const [isAuthenticated, setIsAuthenticated] = useState<string | null>(auth);

    const login = () => {
        setIsAuthenticated(auth);
    };

    const logout = () => {
        setIsAuthenticated('');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default function RequireAuth() {
    const auth = localStorage.getItem("access_token");
    const location = useLocation();

    return auth ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
}
