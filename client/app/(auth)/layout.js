// /app/auth/layout.js

"use client";

import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
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
        <Toaster position="top-right" reverseOrder={false} />
        {children} {/* Only login and signup pages will be rendered here */}
      </div>
    </AuthProvider>
  );
};

export default AuthLayout;
