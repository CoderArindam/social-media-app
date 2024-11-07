"use client";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import { useState } from "react";
import CreatePostModal from "./CreatePostModal"; // Import the modal component

const Header = () => {
  const { user, logout } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false); // State to manage modal

  return (
    <header className="p-4 bg-gray-800 text-white flex justify-between">
      <Link href="/" className="text-2xl font-bold">
        MySocialApp
      </Link>
      {user ? (
        <div className="flex space-x-4">
          <Link href="/feed">Feed</Link>
          <Link href={`/profile/${user.id}`}>Profile</Link>
          <button onClick={() => setModalOpen(true)}>Create Post</button>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <Link href="/login">Login</Link>
      )}
      {isModalOpen && (
        <CreatePostModal closeModal={() => setModalOpen(false)} />
      )}
    </header>
  );
};

export default Header;
