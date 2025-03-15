import { Navigate, Outlet } from "react-router";
import { useAuthentication } from "../../context/Authentication";

const ProtectedRoute = () => {
  const { user, loading } = useAuthentication();

  if (loading) return null;

  if (!user) return <Navigate replace to="/login" />;

  return (
    <div className="bg-gray-200 h-screen w-screen">
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
