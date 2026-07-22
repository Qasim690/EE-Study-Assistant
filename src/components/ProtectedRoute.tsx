import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const session = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
  
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}