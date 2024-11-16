"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Posts from "../components/feed/Posts";
import { getCookie } from "@/utils/auth";

const FeedPage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  console.log(user);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/posts/feed", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
          body: JSON.stringify({ username: user.username }),
        });

        if (!response.ok) {
          throw new Error("Error fetching the feed");
        }

        const data = await response.json();
        setPosts(data); // Each post now includes a `liked` property
      } catch (error) {
        console.error("Error fetching feed:", error);
      }
    };

    fetchFeed();
  }, [user]);

  // useEffect(() => {
  //   const fetchLikedStatus = async () => {
  //     try {
  //       const response = await fetch(
  //         "http://localhost:5000/api/posts/check-liked-status",
  //         {
  //           method: "GET",
  //           credentials: "include",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${getCookie("token")}`,
  //           },
  //           body: JSON.stringify(posts[1].postId),
  //         }
  //       );
  //       if (!response.ok) {
  //         throw new Error("error fetching the likes");
  //       } else {
  //         const data = await response.json();
  //         setisLiked(data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching likes:", error);
  //     }
  //   };
  //   if (user && posts.length > 0) {
  //     fetchLikedStatus();
  //   }
  // }, [user]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Feed</h1>
      {posts?.length > 0 ? (
        posts.map((post) => (
          <Posts
            key={post.postId}
            post={post}
            liked={post.liked}
            isFollowing={post.isFollowing}
          />
        ))
      ) : (
        <p className="text-gray-600">
          No posts available. Start following users to see their posts.
        </p>
      )}
    </div>
  );
};

export default FeedPage;
