"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation"; // Import usePathname
import { getCookie, setCookie, removeCookie } from "../utils/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname(); // Get the current path

  useEffect(() => {
    const token = getCookie("token");

    if (token) {
      // If a token is present, attempt to fetch user info
      fetch("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include", // Ensures cookies are sent with requests
      })
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch user");
          return response.json();
        })
        .then((data) => setUser(data)) // Set user if authenticated
        .catch(() => {
          setUser(null); // Clear user on error
          if (!publicRoutes.includes(pathname)) {
            router.push("/login"); // Redirect to login if not on public route
          }
        });
    } else {
      setUser(null); // No token found, set user to null

      // Redirect only if the current route is protected
      const publicRoutes = ["/login", "/register"];
      if (!publicRoutes.includes(pathname)) {
        router.push("/login");
      }
    }
  }, [router, pathname]);

  const login = async (credentials) => {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (response.ok) {
      setCookie("token", data.token);
      setUser(data.user);
      router.push("/feed");
    } else {
      console.error("Login failed:", data.message);
    }
  };

  const logout = () => {
    removeCookie("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
