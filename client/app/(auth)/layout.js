// /app/auth/layout.js (No Header for Auth Routes)

"use client";

import { useEffect, useState } from "react";
import { AuthProvider } from "../../context/AuthContext";

const AuthLayout = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Prevent rendering during SSR

  return (
    <AuthProvider>
      <div className="auth-layout">
        {children} {/* Only login and signup pages will be rendered here */}
      </div>
    </AuthProvider>
  );
};

export default AuthLayout;
