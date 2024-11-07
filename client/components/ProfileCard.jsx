import FollowButton from "./FollowButton";

const ProfileCard = ({ profile, user }) => {
  const defaultAvatar = "/Default-avatar.jpg";

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg rounded-3xl p-8 mb-8 flex flex-col md:flex-row md:items-center md:justify-between transition-all duration-500 ease-in-out transform hover:scale-105">
      {/* Profile Information */}
      <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
        {/* Profile Picture */}
        <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-300 rounded-full overflow-hidden mb-4 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-2xl">
          <img
            src={profile?.profileImage || defaultAvatar}
            alt="Profile"
            className="w-full h-full object-cover"
            onError={(e) => (e.target.src = defaultAvatar)}
          />
        </div>

        {/* Username and Bio */}
        <h1 className="text-4xl font-semibold text-gray-100">
          {profile?.username}
        </h1>
        {profile?.bio && (
          <p className="text-gray-300 text-sm mt-2 max-w-xs text-center md:text-left">
            {profile?.bio}
          </p>
        )}

        {/* Post/Followers/Following Stats */}
        <div className="flex space-x-8 mt-6 text-center md:text-left">
          <div className="flex flex-col items-center">
            <span className="font-semibold text-2xl">{profile?.postCount}</span>
            <span className="text-sm">Posts</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-semibold text-2xl">
              {profile?.followersCount}
            </span>
            <span className="text-sm">Followers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-semibold text-2xl">
              {profile?.followingCount}
            </span>
            <span className="text-sm">Following</span>
          </div>
        </div>
      </div>

      {/* Follow Button */}
      {user && profile?.id && user?.id !== profile?.id && (
        <FollowButton
          username={profile?.username}
          isFollowing={profile?.isFollowing}
          className="mt-4 md:mt-0"
        />
      )}
    </div>
  );
};

export default ProfileCard;
