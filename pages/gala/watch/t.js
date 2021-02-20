import React from "react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import DB from "../../../lib/db"
import { Tab, Tabs, TabList, TabPanel, resetIdCounter } from "react-tabs"
import Pusher from "pusher-js"

// const useSocket = (...args) => {
//   const { current: socket } = React.useRef(io(...args))
//   React.useEffect(() => {
//     return () => {
//       socket && socket.removeAllListeners()
//       socket && socket.close()
//     }
//   }, [socket])
//   return [socket]
// }

import styles from "../../../styles/Home.module.css"
import GalaHeader from "../../../components/GalaHeader"
import Footer from "../../../components/Footer"
import ScrollToTop from "../../../components/ScrollToTop"
import PlayerMine from "../../../components/PlayerMine"
import Login from "../../../components/Login"
import DonateForm from "../../../components/DonateForm"

// import Login from "../../../components/Login"

export const getServerSideProps = async context => {
  const url = "https://www.youtube.com/watch?v=ADY8cqXYYIw"
  const id = "ADY8cqXYYIw"

  const ip =
    context.req.headers["x-real-ip"] || context.req.connection.remoteAddress

  const key = context.query.key
  // const data = { message: `Successfully logged in with: ${key}`, id: id }

  const check = await DB.checkKeyAndIp(key, ip)
  if (check.isKeyActive && check.isIpActive) {
    return { props: { isKeyActive: true, isIpActive: true, id } }
  }

  if (check.isKeyActive && !check.isIpActive) {
    // context.res.setHeader("Location", `/login`)
    return { props: { isKeyActive: true, isIpActive: false } }
  }

  return {
    props: { data: { isKeyActive: false, isIpActive: false, id: false } },
  }
}

function Watch({ isKeyActive = false, isIpActive = false, id = false }) {
  const [isLive, setIsLive] = React.useState(false)
  const [tabIndex, setTabIndex] = React.useState(0)

  resetIdCounter()

  React.useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSH_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSH_CLUSTER,
    })

    const channel = pusher.subscribe("gala2021")

    channel.bind("gala-event", function (dataFromServer) {
      console.log(dataFromServer)
      switch (dataFromServer.toString().toLowerCase()) {
        case "livestream":
          setTabIndex(0)
          break
        case "program":
          setTabIndex(1)
          break
        case "donate":
          setTabIndex(2)
          break
        default:
          setTabIndex(0)
          break
      }
    })

    return () => pusher.disconnect()
  })

  return (
    <div className="bg-gray-50">
      <Head>
        <title>Events :: Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GalaHeader />
      <div className="container h-full px-4 mx-auto my-8 md:px-0">
        <Tabs
          onSelect={(idx, last, event) => setTabIndex(idx)}
          selectedIndex={tabIndex}
          className="flex flex-col md:space-x-8 md:flex-row lg:mx-8"
          forceRenderTabPanel={true}
        >
          <TabList className="grid grid-cols-1 mb-2 text-sm sm:grid-cols-4 md:mb-0 md:flex md:w-min-300 md:flex-col md:space-y-2">
            <Tab>
              <div className="flex flex-row items-center justify-between px-4 py-2 text-gray-300 bg-blue-900 border rounded-md shadow-xl cursor-pointer hover:opacity-90">
                <p>LiveStream</p>
                {isLive ? <PlayingIcon className="text-green-600" /> : null}
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
              <PlayerMine setIsPlaying={setIsLive} videoId="5qap5aO4i9A" />
              <div className="flex border border-black">Sponsors</div>
            </TabPanel>
            <TabPanel>Programming</TabPanel>
            <TabPanel>
              <DonateForm />
            </TabPanel>
          </div>
        </Tabs>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default Watch

const PlayingIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={`w-4 h-4 ${className}`}
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
        clipRule="evenodd"
      />
    </svg>
  )
}
