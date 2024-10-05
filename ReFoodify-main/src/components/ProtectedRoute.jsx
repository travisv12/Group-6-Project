import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = useSelector((state) => !!state.user.accessToken);
  const toastShownRef = useRef(false);

  useEffect(() => {
    if (!isAuthenticated && !toastShownRef.current) {
      toast.error("You need to login");
      toastShownRef.current = true;
    }
  }, [isAuthenticated]);

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
