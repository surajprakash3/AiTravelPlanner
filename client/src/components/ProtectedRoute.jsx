import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import './ProtectedRoute.css';
import LoadingSpinner from './LoadingSpinner.jsx';

/**
 * Wrapper that redirects to /login if the user is not authenticated.
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="protected-route-loading">
        <LoadingSpinner message="Checking authentication..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
