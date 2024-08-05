import { Navigate } from 'react-router-dom';
import { useAuth } from '../common/auth/index';

function RedirectIfAuthenticated({ children }: any) {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/dashboard" />;
    }

    return children;
}

export default RedirectIfAuthenticated;
