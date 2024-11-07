const FollowerList = ({ users, title }) => {
  if (!users || users.length === 0) {
    return (
      <div className="text-center text-gray-600">
        <p className="text-lg font-semibold">{`No ${title} found.`}</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden mr-4">
                <img
                  src="/Default-avatar.jpg"
                  alt={user.username}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-xl font-semibold text-gray-800">
                  {user.username}
                </p>
                <p className="text-sm text-gray-500">No bio available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowerList;
