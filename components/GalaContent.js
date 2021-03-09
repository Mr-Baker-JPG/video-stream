import React from "react"
import Image from "next/image"
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
import Sponsors from "./Sponsors"

const GalaContent = ({ token, email }) => {
  const { isPlaying, setIsPlaying, sendToken, tab, setTab } = useClientSocket(
    token,
    email
  )
  const isLive = false
  const [time, setTime] = React.useState(0)

  resetIdCounter()

  React.useEffect(() => {
    sendToken(time, "playing")
  }, [isPlaying])

  React.useEffect(() => {
    sendToken(time, "tab")
  }, [tab])

  React.useEffect(() => {
    sendToken(time, "time")
  }, [time])

  const handleTabSelect = (idx, last, event) => {
    setTab(idx)
    sendToken(time, "tab")
  }

  return (
    <div className="container h-full px-4 mx-auto my-8 md:px-4">
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
          <Tab>
            <div className="flex flex-row items-center justify-between px-4 py-2 text-gray-300 bg-blue-900 border rounded-md shadow-xl cursor-pointer hover:opacity-90">
              WIN a St. Watercolor
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
          </TabPanel>
          <TabPanel>
            <Program />
          </TabPanel>
          <TabPanel>
            <DonateForm />
          </TabPanel>
          <TabPanel>
            <div className="flex flex-col space-y-5">
              <p>
                Win an original St. Joseph watercolor created by Amy Stout
                exclusively for John Paul the Great Academy. This vibrant 17.5 x
                21.5 inch watercolor is the perfect image to display in your
                home or office to honor the Guardian of the Redeemer, St.
                Joseph.
              </p>
              <p>
                Enter to win by donating $100 to the 2021 Gala Appeal. Each $100
                donation will equal one entrance to win.
              </p>
              <p>
                All donations will benefit the St. Joseph Scholarship Fund which
                provides tuition assistance to JPG students.{" "}
              </p>
              <p>The winner will be announced on Monday, March 15.</p>
              <div className="relative block bg-white border md:mx-40">
                <Image
                  src="/images/stJoseph.jpg"
                  layout="responsive"
                  height={600}
                  width={510}
                />
              </div>
            </div>
          </TabPanel>
        </div>
      </Tabs>

      <Sponsors />
    </div>
  )
}

export default GalaContent
