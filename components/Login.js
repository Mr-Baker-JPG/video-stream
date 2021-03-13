import React from "react"
import Link from "next/link"
import styles from "../styles/Home.module.css"

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
      // console.log(action)
      return { ...state, status: STATUS_FAILURE, msg: action.payload }
    default:
      return { ...state }
  }
}

function Login() {
  const [state, dispatch] = React.useReducer(statusReducer, {
    status: STATUS_UNSUBMITTED,
    msg: "",
  })

  const submit = async e => {
    e.preventDefault()
    dispatch({ type: DISABLE })
    // const queryClient = new QueryClient()

    const email = e.target.elements.email.value
    // useQuery()
    const data = await (
      await fetch("/api/verify", {
        method: "POST",
        body: JSON.stringify({ email }),
      })
    ).json()
    // console.log(data)
    if (data.type === "SUCCESS") {
      dispatch({ type: SUCCESS, payload: data.msg })
      e.target.elements.email.value = ""
    }
    if (data.type === "FAILURE") {
      console.log("FAIL")
      dispatch({ type: FAILURE, payload: data.msg })
    }

    setTimeout(() => {
      dispatch({ type: RESET })
    }, 4000)
  }

  return (
    <form
      onSubmit={submit}
      className="w-full py-6 mx-auto sm:w-4/6 md:w-3/5 lg:w-3/6 xl:w-96"
    >
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full pr-12 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 pl-7 sm:text-sm"
          />
        </div>
        <div className="pt-2">
          <p className="text-sm font-normal text-gray-400">
            You should use the email you purchased your ticket with here.
          </p>
        </div>
      </div>
      <div className="py-4">
        <button
          type="submit"
          disabled={state.status !== STATUS_UNSUBMITTED}
          className={`relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white  border border-transparent rounded-md group  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            state.status !== STATUS_UNSUBMITTED
              ? "bg-gray-300 hover:bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
          }`}
        >
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="w-5 h-5 text-blue-500 group-hover:text-blue-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </span>
          Email Login Link
        </button>
      </div>
      {state.status === STATUS_SUCCESS && (
        <div className="font-bold text-blue-700">{state.msg}</div>
      )}
      {state.status === STATUS_FAILURE && (
        <div className="font-bold text-red-700">{state.msg}</div>
      )}
    </form>
  )
}

export default Login
