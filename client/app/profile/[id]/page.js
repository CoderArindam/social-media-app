"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import axios from "../../../utils/api";
import ProfileCard from "../../../components/ProfileCard";
import Tabs from "../../../components/Tabs";
import PostGrid from "../../../components/PostGrid";
import FollowerList from "../../../components/FollowerList";

const ProfilePage = ({ params }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/profile/${params.id}`
        );
        setProfile(response.data);
        setPosts(response.data.posts || []); // Use posts from the profile data
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [params.id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="text-center text-lg font-semibold text-gray-700">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <ProfileCard profile={profile} user={user} />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div>
        {activeTab === "posts" && <PostGrid posts={posts} />}{" "}
        {/* Show posts from the profile */}
        {activeTab === "followers" && (
          <FollowerList users={profile.followers} title="Followers" />
        )}
        {activeTab === "following" && (
          <FollowerList users={profile.following} title="Following" />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;