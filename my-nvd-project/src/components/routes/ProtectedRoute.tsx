import { Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

type TProps = {
  children?: React.ReactNode;
};

export const ProtectedRoute = ({ children }: TProps) => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkTokenValidation = async () => {
      try {
        await axiosInstance.get("/auth/me", {
          withCredentials: true,
        });
        setAuthenticated(true);
      } catch (error) {
        localStorage.removeItem("token");
        setAuthenticated(false);
        console.log(error);
      }
    };

    checkTokenValidation();
  }, []);

  if (authenticated === null) {
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
