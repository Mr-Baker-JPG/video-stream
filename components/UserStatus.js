const data = [
  {
    email: "User 1",
    loggedIn: true,
    currentTab: "livestream",
    isPlaying: true,
    time: "00:15:13",
  },
  {
    email: "User 2",
    loggedIn: false,
    currentTab: "donate",
    isPlaying: true,
    time: "00:15:13",
  },
  {
    email: "User 3",
    loggedIn: true,
    currentTab: "donate",
    isPlaying: true,
    time: "00:15:13",
  },
  {
    email: "User 4",
    loggedIn: true,
    currentTab: "program",
    isPlaying: false,
    time: "00:15:13",
  },
  {
    email: "User 5",
    loggedIn: true,
    currentTab: "program",
    isPlaying: false,
    time: "00:15:13",
  },
  {
    email: "User 6",
    loggedIn: true,
    currentTab: "program",
    isPlaying: false,
    time: "00:15:13",
  },
]

const userCountLoggedIn = users => users.filter(u => u.loggedIn).length
const UserStatus = () => {
  return (
    <div>
      <h2>User Status :: {userCountLoggedIn(data)} Users logged in</h2>
      <dl className="overflow-x-scroll border h-96">
        {data.map(user => (
          <div key={user.email}>
            <dt className="flex flex-row items-center p-2 space-x-4 bg-gray-300">
              {user.loggedIn ? (
                <LoggedInIcon className="w-4 h-4 text-green-600" />
              ) : (
                <LoggedOutIcon className="w-4 h-4 text-red-700" />
              )}
              <h3>{user.email}</h3>
            </dt>
            <dd className="flex flex-row p-2 space-x-2">
              {user.loggedIn ? (
                <>
                  <div>Current Tab: </div>
                  <div>Is Playing: </div>
                  <div>Time: </div>
                </>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

const LoggedInIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const LoggedOutIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

export default UserStatus
