"use client";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { setCookie } from "@/utils/auth"; // Import the setCookie function
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(credentials); // Assuming login function returns the response

      if (response && response.token) {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-600">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full p-8 bg-white rounded-3xl shadow-lg transform transition duration-300 hover:scale-105"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            required
          />
        </div>

        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 top-9 flex items-center text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md hover:from-purple-600 hover:to-blue-600 hover:shadow-lg transform hover:scale-105 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
