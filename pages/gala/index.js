import React from "react"
import Head from "next/head"
import Link from "next/link"
import styles from "../../styles/Home.module.css"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import ScrollToTop from "../../components/ScrollToTop"

function Gala() {
  const submit = async e => {
    e.preventDefault()

    const email = e.target.elements.email.value
    const data = await (
      await fetch("/api/getEmails", {
        method: "POST",
        body: JSON.stringify(email),
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
          style={{ backgroundImage: "url(/jpg.jpg)" }}
        ></div>
      </section>
      <h1 className="text-2xl">Gala</h1>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default Gala
