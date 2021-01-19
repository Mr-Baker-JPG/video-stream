import React from "react"
import Head from "next/head"
import Link from "next/link"
import styles from "../styles/Home.module.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import ScrollToTop from "../components/ScrollToTop"

function Events() {
  return (
    <div className="bg-gray-50">
      <Head>
        <title>Events :: JPG Video</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section>
        <div
          className="bg-center bg-no-repeat bg-auto bg-cover h-44"
          style={{ backgroundImage: "url(jpg.jpg)" }}
        ></div>
      </section>
      <main className="pb-10">March 15</main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default Events
