import React from "react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import DB from "../../../lib/db"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
// import prisma from "../../../lib/db/prisma"

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

  console.log("CONTEXT", ip)
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
  console.log({ isKeyActive, isIpActive, id })
  const isLive = false
  // const router = useRouter()
  // const { key } = router.query

  // const id = data?.id

  return (
    <div className="bg-gray-50">
      <Head>
        <title>Events :: Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GalaHeader />
      <div className="container h-full px-4 my-8 md:mx-auto md:px-0">
        <Tabs
          className="flex flex-col md:space-x-8 md:flex-row"
          forceRenderTabPanel={true}
        >
          <TabList className="flex flex-row md:w-min-300 md:flex-col">
            <Tab>LiveStream</Tab>
            <Tab>Program</Tab>
            <Tab>Donate</Tab>
            <li>
              <a target="_blank" href="https://jpgacademy.org/">
                JPGAcademy.org
              </a>
            </li>
          </TabList>
          <div className="w-full">
            <TabPanel>
              <PlayerMine videoId="5qap5aO4i9A" />
              <div className="flex border border-black">Sponsors</div>
            </TabPanel>
            <TabPanel>Programming</TabPanel>
            <TabPanel>
              <DonateForm />
            </TabPanel>
          </div>
        </Tabs>
      </div>
      {/* <main className="container grid grid-cols-1 p-4 px-4 mx-auto mb-12 md:grid-cols-6 md:gap-7 lg:gird-cols-10">
        <nav className="flex w-full mb-4 md:col-span-2 lg:grid-cols-2">
          <ul className="flex flex-col w-full">
            <li className="w-full p-2 font-light text-gray-300 from-first-blue to-last-blue bg-gradient-to-b">
              Program
            </li>
            <li className="w-full p-2 font-light text-gray-300 from-first-blue to-last-blue bg-gradient-to-b">
              Donate
            </li>
            <li className="w-full p-2 font-light text-gray-300 from-first-blue to-last-blue bg-gradient-to-b">
              JPGAcademy.org
            </li>
          </ul>
        </nav>
        <div className="flex flex-col h-full space-y-7 md:col-span-4 lg:grid-cols-8">
          <PlayerMine videoId="ADY8cqXYYIw" />
          <div className="flex border border-black">Sponsors</div>
        </div>
      </main> */}
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default Watch
