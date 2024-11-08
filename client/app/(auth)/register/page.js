"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "username") {
      // Allow only letters, numbers, underscores, and dots
      if (/^[a-zA-Z0-9._]*$/.test(value)) {
        setFormData((prevData) => ({ ...prevData, [name]: value.trim() }));
      }
    } else if (name === "email") {
      // Email input sanitization (basic validation for allowed characters)
      if (/^[a-zA-Z0-9@._-]*$/.test(value)) {
        setFormData((prevData) => ({ ...prevData, [name]: value.trim() }));
      }
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value.trim() }));
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Registration successful! Redirecting...");
        router.push("/login");
      } else {
        const data = await response.json();
        toast.error(data.message || "Registration failed!");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
      <div className="max-w-md w-full p-8 bg-white rounded-3xl shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              placeholder="Choose a unique username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              placeholder="Enter your email"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-3 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              placeholder="Create a secure password"
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
            disabled={loading}
            className={`w-full py-3 mt-6 font-semibold rounded-lg transition duration-200 ${
              loading
                ? "bg-gray-400"
                : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-indigo-500"
            } text-white shadow-md hover:shadow-lg transform hover:scale-105`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-500 font-semibold hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
