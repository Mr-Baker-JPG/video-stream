import React from "react"
import { Tab, Tabs, TabList, TabPanel, resetIdCounter } from "react-tabs"
import useClientSocket from "hooks/useClientSocket"
// import Pusher from "pusher-js"

import styles from "styles/Home.module.css"
import PlayerMine from "components/PlayerMine"
import dynamic from "next/dynamic"
const Program = dynamic(() => import("components/Program"), { ssr: false })
// import Program from "components/Program"
import DonateForm from "components/DonateForm"
import PlayingIcon from "components/icons/Play"

const GalaContent = ({ token }) => {
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
          <TabPanel>
            <Program />
          </TabPanel>
          <TabPanel>
            <DonateForm />
          </TabPanel>
        </div>
      </Tabs>
    </div>
  )
}

export default GalaContent
