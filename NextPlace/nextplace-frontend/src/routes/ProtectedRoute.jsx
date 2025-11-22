import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, requiredRole }) {
  const storedUser = localStorage.getItem("user");

  // Si no hay user en LocalStorage → redirigir al login
  if (!storedUser) return <Navigate to="/login" replace />;

  let user;

  try {
    user = JSON.parse(storedUser);
  } catch (e) {
    console.error("Error parsing user JSON:", e);
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }

  // Si requiere rol específico y el usuario no lo tiene → denegar acceso
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
