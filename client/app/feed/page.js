// "use client";
// import React, { useEffect, useState } from "react";
// import { useAuth } from "../../context/AuthContext";
// import Posts from "../../components/feed/Posts.jsx";
// import { getCookie } from "@/utils/auth";

// const FeedPage = () => {
//   const { user } = useAuth();
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/posts/feed", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${getCookie("token")}`, // Double-checking token usage
//           },
//           credentials: "include", // Ensure cookies are sent
//         });

//         if (!response.ok) {
//           throw new Error("Error fetching feed");
//         }

//         const data = await response.json();
//         setPosts(data); // Store the posts data as received from the backend
//       } catch (error) {
//         console.error("Error fetching feed:", error);
//       }
//     };

//     if (user) fetchPosts();
//   }, [user]);

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Your Feed</h1>
//       {posts?.length > 0 ? (
//         posts.map((post) => <Posts key={post.postId} post={post} />)
//       ) : (
//         <p className="text-gray-600">
//           No posts available. Start following users to see their posts.
//         </p>
//       )}
//     </div>
//   );
// };

// export default FeedPage;
