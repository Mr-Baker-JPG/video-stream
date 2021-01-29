import React from "react"
import Head from "next/head"
import Link from "next/link"
import styles from "../../styles/Home.module.css"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import ScrollToTop from "../../components/ScrollToTop"
import PlayerMine from "../../components/PlayerMine"

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
    <div className="relative bg-gray-50">
      <Head>
        <title>Events :: Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div className="relative pt-4 border-b-4 border-white border-opacity-5 from-first-blue to-last-blue bg-gradient-to-b">
          <header id="header" className="container mx-auto border-white">
            <div>
              <img className="px-4 mx-auto" src="/images/gala-logo.png" />
            </div>
            <div>LINKS</div>
          </header>
        </div>
        <section>
          <div
            className="h-24 bg-left bg-no-repeat bg-auto bg-cover md:h-36 "
            style={{ backgroundImage: "url(/images/jpg.jpg)" }}
          ></div>
        </section>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default Gala
