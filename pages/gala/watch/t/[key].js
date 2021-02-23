import React from "react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import DB from "lib/db"
import { Tab, Tabs, TabList, TabPanel, resetIdCounter } from "react-tabs"
import socketIOClient from "socket.io-client"
// import Pusher from "pusher-js"

import useClientSocket from "hooks/useClientSocket"

import styles from "styles/Home.module.css"
import PlayingIcon from "components/icons/Play"
import GalaHeader from "components/GalaHeader"
import Footer from "components/Footer"
import ScrollToTop from "components/ScrollToTop"
import PlayerMine from "components/PlayerMine"
import Login from "components/Login"
import DonateForm from "components/DonateForm"

// import Login from "../../../components/Login"

export const getServerSideProps = async context => {
  const ip =
    context.req.headers["x-real-ip"] || context.req.connection.remoteAddress

  const key = context.query.key // || "7d70903c-d303-445e-a5b6-f9631b5b6a58"

  try {
    const check = await DB.checkKeyAndIp(key, ip)
    if (check.isKeyActive && check.isIpActive) {
      return { props: { isKeyActive: true, isIpActive: true, token: key } }
    }

    if (check.isKeyActive && !check.isIpActive) {
      return { props: { isKeyActive: true, isIpActive: false, token: key } }
    }
  } catch (error) {
    // console.log(error)
  }
  return {
    props: {
      isKeyActive: false,
      isIpActive: false,
      token: key,
    },
  }
}

function Watch({ isKeyActive = false, isIpActive = false, id = false, token }) {
  console.log(isKeyActive, isIpActive)
  const { isPlaying, setIsPlaying, sendToken, tab, setTab } = useClientSocket(
    token
  )
  const isLive = false
  const [time, setTime] = React.useState(0)

  resetIdCounter()

  React.useEffect(() => {
    sendToken(time)
  }, [isPlaying, tab, time])

  const handleTabSelect = (idx, last, event) => {
    setTab(idx)
    sendToken(time)
  }

  return (
    <div className="bg-gray-50">
      <Head>
        <title>Events :: JPG Gala</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GalaHeader />
      {!isKeyActive || !isIpActive ? (
        <div className="container p-4 mx-auto sm:px-8 lg:w-1/2">
          <h2 className="text-2xl font-bold">
            Invalid {!isKeyActive ? "Key" : "Device"}
          </h2>
          {!isKeyActive ? (
            <p className="">
              Your key is invalid. Please check your email for the link sent to
              you. Otherwise, use the form below to have a new link emailed to
              you.
            </p>
          ) : (
            <p>
              You have attempted to log in with a different device. If you would
              like to have a new key emailed to you, please type it below.
            </p>
          )}
          <Login />
        </div>
      ) : isLive ? (
        <div className="container h-full px-4 mx-auto my-8 md:px-0">
          <Tabs
            onSelect={handleTabSelect}
            selectedIndex={tab}
            className="flex flex-col md:space-x-8 md:flex-row lg:mx-8"
            forceRenderTabPanel={true}
          >
            <TabList className="grid grid-cols-1 mb-2 text-sm sm:grid-cols-4 md:mb-0 md:flex md:w-min-300 md:flex-col md:space-y-2">
              <Tab>
                <div className="flex flex-row items-center justify-between px-4 py-2 text-gray-300 bg-blue-900 border rounded-md shadow-xl cursor-pointer hover:opacity-90">
                  <p>LiveStream</p>
                  {isPlaying ? (
                    <PlayingIcon filled className="w-4 h-4 text-green-600" />
                  ) : null}
                </div>
              </Tab>
              <Tab>
                <div className="flex flex-row items-center justify-between px-4 py-2 text-gray-300 bg-blue-900 border rounded-md shadow-xl cursor-pointer hover:opacity-90">
                  Program
                </div>
              </Tab>
              <Tab>
                <div className="flex flex-row items-center justify-between px-4 py-2 text-gray-300 bg-blue-900 border rounded-md shadow-xl cursor-pointer hover:opacity-90">
                  Donate
                </div>
              </Tab>
              <li>
                <a
                  target="_blank"
                  href="https://jpgacademy.org/"
                  className="flex flex-row items-center justify-between px-4 py-2 text-gray-300 bg-blue-900 border rounded-md shadow-xl cursor-pointer hover:opacity-90"
                >
                  JPGAcademy.org
                </a>
              </li>
            </TabList>
            <div className="w-full">
              <TabPanel>
                <PlayerMine
                  setTime={setTime}
                  setIsPlaying={setIsPlaying}
                  forcePlay={isPlaying}
                  videoId="5qap5aO4i9A"
                />
                <div className="flex border border-black">Sponsors</div>
              </TabPanel>
              <TabPanel>Programming</TabPanel>
              <TabPanel>
                <DonateForm />
              </TabPanel>
            </div>
          </Tabs>
        </div>
      ) : (
        <main className="container grid grid-cols-1 p-4 px-4 mx-auto mb-12 ">
          <h2 className="text-2xl">
            Check back on March 13, 2020 for the livestream.
          </h2>
        </main>
      )}

      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default Watch

// const PlayingIcon = ({ className }) => {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 20 20"
//       fill="currentColor"
//       className={`w-4 h-4 ${className}`}
//     >
//       <path
//         fillRule="evenodd"
//         d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
//         clipRule="evenodd"
//       />
//     </svg>
//   )
// }
