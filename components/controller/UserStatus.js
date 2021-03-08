import * as React from "react"

import DB from "lib/db"
import { toTimeStamp } from "lib/utils"
import useAdminSocket from "hooks/useAdminSocket"

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

const getCurrentTab = tabIndex => {
  switch (tabIndex) {
    case 1:
      return "program"
    case 2:
      return "donate"
    case 0:
    default:
      return "livestream"
  }
}

const UserStatus = ({ clients }) => {
  const [emails, setEmails] = React.useState([])
  const emailsRef = React.useRef([])

  React.useEffect(() => {
    emailsRef.current = emails
  })

  const updateEmails = (emails, clients) =>
    emails.map(email => {
      const idx = clients.findIndex(m => m.token === email.key)
      return {
        ...email,
        loggedIn: idx >= 0,
        currentTab: idx >= 0 ? getCurrentTab(clients[idx].tabIndex) : false,
        isPlaying: idx >= 0 ? clients[idx].isPlaying : false,
        time: toTimeStamp(idx >= 0 ? clients[idx].time : 0),
      }
    })

  React.useEffect(() => {
    const getEmails = async () => {
      let emails = await (await fetch("/api/control/getEmails")).json()
      emails = updateEmails(emails, clients)

      setEmails(emails)
    }

    getEmails()

    // return () => socket.close()
  }, [])

  return (
    <div className="p-2 border border-gray-300 shadow-lg">
      <div className="flex flex-row place-content-between">
        <h2 className="font-bold ">User Status</h2>
        <p className="italic">
          {`${clients.length}/${emails.length}`} Users logged in
        </p>
      </div>
      <dl className="overflow-x-scroll border border-b-0 h-96">
        {updateEmails(emails, clients).map(user => (
          <div key={user.email}>
            <dt className="flex flex-row items-center p-2 space-x-4 bg-gray-300 ">
              {user.loggedIn ? (
                <LoggedInIcon className="w-4 h-4 text-green-600" />
              ) : (
                <LoggedOutIcon className="w-4 h-4 text-red-700" />
              )}
              <div className="flex flex-row items-center w-full place-content-between">
                <h3>{user.email}</h3>
                <p>
                  <a>
                    <EmailIcon className="w-5 h-4 text-gray-800" />
                  </a>
                </p>
              </div>
            </dt>
            <dd className="flex flex-row p-2 space-x-2 text-xs">
              {user.loggedIn ? (
                <div className="grid w-full grid-cols-3">
                  <div>
                    <span className="font-bold">Tab:</span> {user.currentTab}
                  </div>
                  <div>
                    <span className="font-bold">Status:</span>{" "}
                    {user.isPlaying ? "Playing" : "Off"}
                  </div>
                  <div>
                    <span className="font-bold">Time:</span> {user.time}
                  </div>
                </div>
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

const EmailIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
  >
    <path d="M20 4h-16c-1.1 0-1.99.9-1.99 2l-.01 12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2zm0 4l-8 5-8-5v-2l8 5 8-5v2z"></path>
  </svg>
)

export default UserStatus
