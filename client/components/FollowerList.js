const FollowerList = ({ users, title }) => {
  if (!users || users.length === 0) {
    return (
      <div className="text-center text-gray-600">
        <p>No {title} found.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {users.map((user) => (
        <div key={user.id} className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden mr-4">
            <img
              src={user.profileImage || "/default-avatar.png"}
              alt={user.username}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium">{user.username}</p>
            <p className="text-sm text-gray-500">{user.bio}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FollowerList;
