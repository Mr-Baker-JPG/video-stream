import React from "react"
import Head from "next/head"
import Link from "next/link"
import styles from "../styles/Home.module.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import ScrollToTop from "../components/ScrollToTop"

import { QueryClient, useQuery } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"

function Events() {
  const submit = async e => {
    e.preventDefault()
    // const queryClient = new QueryClient()

    const email = e.target.elements.email.value
    // useQuery()
    const data = await (
      await fetch("/api/verify", {
        method: "POST",
        body: JSON.stringify({ email }),
      })
    ).json()
    console.log(data)
  }

  return (
    <div className="bg-gray-50">
      <Head>
        <title>Events :: Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section>
        <div
          className="bg-center bg-no-repeat bg-auto bg-cover h-44 md:h-96"
          style={{ backgroundImage: "url(jpg.jpg)" }}
        ></div>
      </section>
      <form onSubmit={submit}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </form>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default Events
