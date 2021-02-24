import React from "react"
import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import styles from "../../styles/Home.module.css"
import GalaHeader from "../../components/GalaHeader"
import Footer from "../../components/Footer"
import RegisterForm from "components/RegisterForm"

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

      <GalaHeader />
      <main className="container flex flex-col w-full px-8 py-8 mx-auto space-x-4 md:flex-row">
        <div className="w-full md:w-3/5">
          <Image
            src="/images/gala.jpg"
            layout="responsive"
            height={300}
            width={500}
          />
        </div>
        <p className="w-full md:w-2/5">
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

      <RegisterForm />
      <Footer />
    </div>
  )
}

export default Gala
