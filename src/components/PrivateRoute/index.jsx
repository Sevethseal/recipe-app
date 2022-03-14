import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthWrapper";
const PrivateRoute = ({ component: Component }) => {
  const { currentUser } = useAuth();
  return currentUser ? <Component /> : <Navigate to="/" />;
};

export default PrivateRoute;
