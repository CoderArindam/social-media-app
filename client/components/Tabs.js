const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center mb-6 space-x-8 border-b-2 border-gray-300">
      <button
        onClick={() => setActiveTab("posts")}
        className={`py-2 px-4 text-lg font-medium transition-colors duration-300 ${
          activeTab === "posts"
            ? "border-b-2 border-blue-500 text-blue-500"
            : "text-gray-600 hover:text-blue-500"
        }`}
      >
        Posts
      </button>
      <button
        onClick={() => setActiveTab("followers")}
        className={`py-2 px-4 text-lg font-medium transition-colors duration-300 ${
          activeTab === "followers"
            ? "border-b-2 border-blue-500 text-blue-500"
            : "text-gray-600 hover:text-blue-500"
        }`}
      >
        Followers
      </button>
      <button
        onClick={() => setActiveTab("following")}
        className={`py-2 px-4 text-lg font-medium transition-colors duration-300 ${
          activeTab === "following"
            ? "border-b-2 border-blue-500 text-blue-500"
            : "text-gray-600 hover:text-blue-500"
        }`}
      >
        Following
      </button>
    </div>
  );
};

export default Tabs;
