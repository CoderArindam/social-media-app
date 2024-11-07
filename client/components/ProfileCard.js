import FollowButton from "./FollowButton";

const ProfileCard = ({ profile, user }) => {
  const defaultAvatar = "/Default-avatar.jpg";

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg rounded-lg p-6 mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
        {/* Profile Picture */}
        <div className="w-28 h-28 md:w-36 md:h-36 bg-gray-300 rounded-full overflow-hidden mb-4">
          <img
            src={profile?.profileImage || defaultAvatar}
            alt="Profile"
            className="w-full h-full object-cover transition-all duration-200 transform hover:scale-105"
            onError={(e) => (e.target.src = defaultAvatar)}
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-100">
          {profile?.username}
        </h1>
        {profile?.bio && (
          <p className="text-gray-300 text-sm mt-2">{profile?.bio}</p>
        )}
        <div className="flex space-x-6 mt-4">
          <div className="flex flex-col items-center">
            <span className="font-semibold text-xl">{profile?.postCount}</span>
            <span className="text-sm">Posts</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-semibold text-xl">
              {profile?.followersCount}
            </span>
            <span className="text-sm">Followers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-semibold text-xl">
              {profile?.followingCount}
            </span>
            <span className="text-sm">Following</span>
          </div>
        </div>
      </div>

      {/* Follow Button */}
      {user && profile?.id && user?.id !== profile?.id && (
        <FollowButton
          userId={profile?.id}
          isFollowing={profile?.isFollowing}
          className="mt-4 md:mt-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gradient-to-l transition-all duration-300"
        />
      )}
    </div>
  );
};

export default ProfileCard;
