"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation"; // Import usePathname
import { getCookie, setCookie, removeCookie } from "../utils/auth";

const AuthContext = createContext();

// Public routes that do not require authentication
const publicRoutes = ["/login", "/register"];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname(); // Get the current path

  useEffect(() => {
    const token = getCookie("token");

    if (token) {
      // If token exists, try fetching the user data
      fetch("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include", // Ensures cookies are sent with requests
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user");
          }
          return response.json();
        })
        .then((data) => setUser(data)) // Successfully set user data
        .catch((error) => {
          console.error("Error fetching user:", error);
          setUser(null);
          if (!publicRoutes.includes(pathname)) {
            router.push("/login"); // Redirect to login if user not fetched and on protected route
          }
        });
    } else {
      setUser(null); // No token found, clear user
      if (!publicRoutes.includes(pathname)) {
        router.push("/login"); // Redirect if route is protected
      }
    }
  }, [pathname]); // Depend on pathname only, not router

  // Login function to authenticate user
  const login = async (credentials) => {
    const { email, password } = credentials;

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();

      // Set the token and username in cookies after a successful login
      setCookie("token", data.token); // Save token in cookie
      setCookie("username", data.user.username); // Save username in cookie

      return data; // Return data containing token and user info
    } catch (error) {
      console.error("Error during login:", error);
      throw error; // Re-throw error for handling in the component
    }
  };

  // Logout function to clear user session
  const logout = () => {
    removeCookie("token");
    setUser(null);
    router.push("/login"); // Redirect to login after logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use Auth context
export const useAuth = () => useContext(AuthContext);
