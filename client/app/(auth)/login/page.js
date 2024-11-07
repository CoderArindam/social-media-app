"use client";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { setCookie } from "@/utils/auth"; // Import the setCookie function

const LoginPage = () => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(credentials); // Assuming login function returns the response

      if (response && response.token) {
        console.log("Token:", response.token); // Check token
        console.log("Username:", response.user.username); // Check username

        // Store the token and username in cookies
        setCookie("token", response.token);
        setCookie("username", response.user.username);

        // Redirect to feed or another page
        window.location.href = "/feed";
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-4 border rounded-md"
    >
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={credentials.email}
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
        className="w-full mb-2 p-2 border rounded-md"
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        className="w-full mb-4 p-2 border rounded-md"
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded-md"
      >
        Login
      </button>
    </form>
  );
};

export default LoginPage;
