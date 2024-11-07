"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import axios from "../../../utils/api";
import ProfileCard from "../../../components/profile/ProfileCard";
import Tabs from "../../../components/buttons/Tabs.jsx";
import PostGrid from "../../../components/profile/PostGrid";
import FollowerList from "../../../components/profile/FollowerList";

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
        setPosts(response.data.posts || []);
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
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <ProfileCard profile={profile} user={user} />
      <div className="my-6">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="mt-6">
        {activeTab === "posts" && <PostGrid posts={posts} />}
        {activeTab === "followers" && (
          <FollowerList
            users={profile?.followers.map((f) => ({
              username: f.followerUsername,
            }))}
            title="Followers"
          />
        )}
        {activeTab === "following" && (
          <FollowerList
            users={profile?.following.map((f) => ({
              username: f.followingUsername,
            }))}
            title="Following"
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
