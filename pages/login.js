import React from "react"
import Head from "next/head"
import Link from "next/link"
import styles from "../styles/Home.module.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Login from "../components/Login"
import ScrollToTop from "../components/ScrollToTop"

import { QueryClient, useQuery } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"

const STATUS_UNSUBMITTED = "STATUS_UNSUBMITTED"
const STATUS_SUCCESS = "STATUS_SUCCESS"
const STATUS_FAILURE = "STATUS_FAILURE"
const STATUS_DISABLED = "STATUS_DISABLED"
const DISABLE = "DISABLE"
const RESET = "RESET"
const SUCCESS = "SUCCESS"
const FAILURE = "FAILURE"

const statusReducer = (state, action) => {
  switch (action.type) {
    case DISABLE:
      return { ...state, status: STATUS_DISABLED }
    case RESET:
      return { ...state, status: STATUS_UNSUBMITTED, msg: "" }
    case SUCCESS:
      return { ...state, status: STATUS_SUCCESS, msg: action.payload }
    case FAILURE:
      console.log(action)
      return { ...state, status: STATUS_FAILURE, msg: action.payload }
    default:
      return { ...state }
  }
}

function Events() {
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
          style={{ backgroundImage: "url(/images/jpg.jpg)" }}
        ></div>
      </section>
      <Login />
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default Events
