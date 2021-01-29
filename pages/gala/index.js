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
            className="h-32 bg-left bg-no-repeat bg-auto bg-cover md:h-56 "
            style={{
              backgroundImage: "url(/images/school.jpg)",
              backgroundPositionY: "80%",
            }}
          ></div>
        </section>
      </div>
      <main className="container flex flex-col px-8">
        <img src="/images/gala.jpg" className="flex" />
        <p className="flex">
          John Paul the Great Academy is honored to welcome Fr. Donald Calloway,
          MIC, as the 14th Annual Veritas Lecture & Gala Guest Speaker. Fr.
          Calloway, a convert to Catholicism, is a member of the Congregation of
          Marian Fathers of the Immaculate Conception. Before his conversion to
          Catholicism, he was a high school dropout who had been kicked out of a
          foreign country, institutionalized twice, and thrown in jail multiple
          times. After his radical conversion he earned a B.A. in Philosophy and
          Theology from the Franciscan University of Steubenville, M.Div. and
          S.T.B. degrees from the Dominican House of Studies in Washington, DC,
          and an S.T.L. in Mariology from the International Marian Research
          Institute in Dayton, Ohio.
        </p>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default Gala
