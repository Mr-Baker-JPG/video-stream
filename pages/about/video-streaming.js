import React from "react"
import Head from "next/head"
import Link from "next/link"
import styles from "../../styles/Home.module.css"

import Header from "../../components/Header"
import Footer from "../../components/Footer"
import ScrollToTop from "../../components/ScrollToTop"

export default function Home() {
  return (
    <div className="bg-gray-50">
      <Head>
        <title>JPG Video</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section>
        <div className="overflow-hidden md:h-96">
          <div
            className="bg-center bg-no-repeat bg-auto bg-cover h-44 md:h-96"
            style={{ backgroundImage: "url(/images/jpg.jpg)" }}
          ></div>
        </div>
      </section>
      <main className="container px-10 pb-10 mx-auto ">
        <h2 className="text-2xl">Video Streaming</h2>
        <p>
          Welcome to our digital help page. Below you will find a list of
          resources on how to view our digital content on your TV.
        </p>
        <p>
          If you have purchased a ticket to a digitally streamed performance,
          you will receive a link to the streaming content via email. When it's
          show time, simply click the link, enter the provided code and/or
          password, and enjoy!
        </p>
        <p>
          <b>CAUTION:</b> These links will only work on one device, so do NOT
          share with other households or you may be locked out of the content.
        </p>
        <p>
          Many people get the most out of watching streaming content by
          connecting their computers, phones or tablets to their TV.
        </p>
        <p>
          To get the best quality when viewing on your TV, we recommend
          connecting your device via an HDMI cable.
        </p>
        <p>
          Never connected your laptop to your TV before?{" "}
          <a
            className="font-bold underline"
            href="https://www.cnet.com/how-to/how-to-connect-your-laptop-to-your-tv-wirelessly-or-with-hdmi/"
          >
            Click here
          </a>{" "}
          for an overview on how to get started.
        </p>
        <h2 className="pt-4 text-2xl text-red-800">
          Streaming Device & Cables
        </h2>
        <ul className="flex flex-col">
          <li>
            <a
              className="font-bold underline"
              href="https://www.bestbuy.com/site/home-entertainment/connect-laptop-to-tv/pcmcat1496253834782.c?id=pcmcat1496253834782"
            >
              Connect with HDMI
            </a>
          </li>
          <li>
            <a
              className="font-bold underline"
              href="https://mashtips.com/cast-to-fire-stick-from-pc/"
            >
              Firestick
            </a>
          </li>
          <li>
            <a
              className="font-bold underline"
              href="https://support.roku.com/article/208754928"
            >
              Roku
            </a>
          </li>
          <li>
            <a
              className="font-bold underline"
              href="https://support.google.com/chromecast/answer/3228332?co=GENIE.Platform%3DDesktop&hl=en"
            >
              Chromecast
            </a>
          </li>
          <li>
            <a
              className="font-bold underline"
              href="https://support.apple.com/en-us/HT204289"
            >
              Apple TV
            </a>
          </li>
        </ul>
        <p className="text-gray-600">
          Don’t see your streaming device listed? We recommend searching for the
          user manual on the manufacturer’s website—it will have the most
          up-to-date information.
        </p>
        <h2 className="pt-4 text-2xl text-red-800">Operating System</h2>
        <ul className="flex flex-col">
          <li>
            <a
              className="font-bold underline"
              href="https://answers.microsoft.com/en-us/windows/forum/all/connect-windows-10-pc-to-smart-tv/01496207-6c2f-4d28-8313-12d037098d78"
            >
              Windows 10
            </a>
          </li>
          <li>
            <a
              className="font-bold underline"
              href="https://support.apple.com/en-us/HT204289"
            >
              Mac, iOS, & iPad
            </a>
          </li>
        </ul>
        <h2 className="pt-4 text-2xl text-red-800">Top TV Brands</h2>
        <ul className="flex flex-col">
          <li>
            <a
              className="font-bold underline"
              href="https://www.sony.com/electronics/support/articles/00044548"
            >
              Sony
            </a>
          </li>
          <li>
            <a
              className="font-bold underline"
              href="https://www.lg.com/us/support/help-library/screen-share-screen-mirroring-device-to-tv-CT10000018-20150637965681"
            >
              LG
            </a>
          </li>
          <li>
            <a
              className="font-bold underline"
              href="https://www.samsung.com/us/support/answer/ANS00062585/"
            >
              Samsung
            </a>
          </li>
          <li>
            <a
              className="font-bold underline"
              href="https://www.vizio.com/smartcast-how-to-cast"
            >
              Visio
            </a>
          </li>
        </ul>
        <p className="text-gray-600">
          Don’t see your TV brand listed? We recommend searching for the user
          manual on the manufacturer’s website—it will have the most up-to-date
          information.
        </p>
        <h2 className="pt-4 text-2xl text-red-800">Quality</h2>
        <p>
          The quality of the video you are streaming to your device and tv can
          be affected by many different factors.{" "}
          <span className="text-gray-600 underline">
            While we aren’t able to troubleshoot individual situations
          </span>
          , we do have a couple of tips.{" "}
        </p>
        <p>
          Check for other devices using the internet. Is someone else streaming
          a movie or on a video call? Each device on your network uses part of
          your available internet, potentially decreasing the quality of your
          video stream.
        </p>{" "}
        <p>
          Close apps or programs you are not using, it can help free up space to
          allow your computer to run faster.{" "}
        </p>
        <p>
          Ask for help! Is there a tech-savvy person in your family? See if they
          can help you.
        </p>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
