"use client";
import { useState } from "react";
import { useAuth } from "../context/AuthContext"; // Ensure this is correct
import Link from "next/link";
import CreatePostModal from "./CreatePostModal";
import {
  FaHome,
  FaSearch,
  FaPlusSquare,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import Search from "./Search"; // You can modify this Search component accordingly

const AppBar = () => {
  const { user, logout } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearchBar = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <>
      {/* Bottom Navigation Bar */}
      <header className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4 z-50">
        <div className="max-w-7xl mx-auto flex justify-around items-center">
          {/* Navigation Links and Buttons */}
          {user ? (
            <div className="flex gap-12 items-center">
              <Link href="/" passHref>
                <FaHome className="text-2xl cursor-pointer hover:text-blue-500" />
              </Link>
              <button
                onClick={toggleSearchBar}
                className="text-2xl cursor-pointer hover:text-blue-500"
              >
                <FaSearch />
              </button>
              <button
                onClick={() => setModalOpen(true)}
                className="text-2xl cursor-pointer hover:text-blue-500"
              >
                <FaPlusSquare />
              </button>
              <Link href={`/profile/${user.username}`} passHref>
                <FaUser className="text-2xl cursor-pointer hover:text-blue-500" />
              </Link>

              <button
                onClick={logout}
                className="text-2xl cursor-pointer hover:text-red-500"
              >
                <FaSignOutAlt />
              </button>
            </div>
          ) : (
            <Link href="/login" passHref>
              <button className="text-2xl cursor-pointer hover:text-blue-500">
                Login
              </button>
            </Link>
          )}
        </div>
      </header>

      {/* Search Bar above the AppBar */}
      {isSearchVisible && (
        <div className="bg-white shadow-md p-4 fixed bottom-16 left-0 right-0 z-40">
          <Search />
        </div>
      )}

      {/* Modal for Create Post */}
      {isModalOpen && (
        <CreatePostModal closeModal={() => setModalOpen(false)} />
      )}
    </>
  );
};

export default AppBar;
