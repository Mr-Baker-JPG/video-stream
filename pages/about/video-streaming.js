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
      <main className="pb-10">
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
          <a href="https://www.cnet.com/how-to/how-to-connect-your-laptop-to-your-tv-wirelessly-or-with-hdmi/">
            Click here
          </a>
          for an overview on how to get started.
        </p>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
