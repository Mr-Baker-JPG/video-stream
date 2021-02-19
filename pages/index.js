import React from "react"
import Head from "next/head"
import Link from "next/link"
import styles from "../styles/Home.module.css"

import Header from "../components/Header"
import Footer from "../components/Footer"
import ScrollToTop from "../components/ScrollToTop"
import DonateForm from "../components/DonateForm"

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
          <video autoPlay={true} width="250" loop muted className="w-full ">
            <source type="video/mp4" src="/videos/jpg-splash-vimeo.mp4" />
          </video>
        </div>
      </section>
      <main className="pb-10 lg:container lg:mx-auto">
        <p className="p-5 mt-10 text-sm font-light leading-7 border-0 border-t sm:px-10">
          John Paul the Great Academy is a small, independent, Catholic school
          that provides a rigorous classical education in liberal arts and
          sciences and promotes the sacred traditions of the Roman Catholic
          Church. Our mission depends on support from people like you.{" "}
        </p>

        {/* <iframe
          src="https://api.causeview.com/form/v2.1/cupertino/wizard/a0JC000000lC2t3MAC?lid=a0V3700000073rj&amp;cid=70137000000LaHt&amp;hostUrl=https%3A%2F%2Fd2y1pz2y630308.cloudfront.net%2F2409%2Fdocuments%2F2015%2F9%2Fform.html"
          width="100%"
          height="550"
          scrolling="yes"
          frameBorder="0"
          className="p-4 sm:px-10"
        ></iframe> */}
        <DonateForm />

        <div className="p-5 mt-10 border-0 border-t sm:px-10">
          <h2 className="pt-4 font-serif text-4xl text-center">Featured</h2>
          <div className="w-24 h-2 mx-auto mt-6 bg-red-900 "></div>

          <div className="flex flex-col mt-10 md:flex-row md:space-x-12">
            <div className="md:w-1/2">
              <img src="/images/gala.jpg" />
            </div>
            <div className="md:w-1/2">
              <h3 className="inline-block w-auto pt-4 mb-4 font-serif text-xl border-b border-red-900 md:pt-0 ">
                <Link href="/gala">
                  <a href="/gala">2021 Veritas Lecture and Gala Dinner</a>
                </Link>
              </h3>
              <p className="text-sm font-light leading-7 ">
                John Paul the Great Academy is honored to welcome Fr. Donald
                Calloway, MIC, as the 14th Annual Veritas Lecture & Gala Guest
                Speaker. Fr. Calloway, a convert to Catholicism, is a member of
                the Congregation of Marian Fathers of the Immaculate Conception.
                Before his conversion to Catholicism, he was a high school
                dropout who had been kicked out of a foreign country,
                institutionalized twice, and thrown in jail multiple times.
                After his radical conversion he earned a B.A. in Philosophy and
                Theology from the Franciscan University of Steubenville, M.Div.
                and S.T.B. degrees from the Dominican House of Studies in
                Washington, DC, and an S.T.L. in Mariology from the
                International Marian Research Institute in Dayton, Ohio.
              </p>
            </div>
          </div>

          <div className="flex flex-col mt-10 md:flex-row md:space-x-12">
            <div className="md:w-1/2">
              <img src="/images/capstone.png" />
            </div>
            <div className="md:w-1/2">
              <h3 className="inline-block w-auto pt-4 mb-4 font-serif text-xl border-b border-red-900 md:pt-0 ">
                Capstone Presentations
              </h3>
              <p className="text-sm font-light leading-7 ">
                Each year, JPG Seniors present their final project.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
