import React from "react"
import Link from "next/link"

function Header() {
  const [open, setOpen] = React.useState(false)

  const toggleMenu = () => {
    setOpen(!open)
  }
  return (
    <>
      <div
        className={`z-50 fixed overflow-hidden w-full h-full px-5 pt-2 bg-blue-900 lg:hidden ${
          open ? "top-0" : "top-full"
        }`}
        id="menu"
      >
        <div className="flex flex-row items-center justify-between ">
          <Link href="/">
            <a href="#" onClick={toggleMenu} className="focus:outline-red">
              <img className="p-1 h-14 md:h-16" src="/video-logo.png" />
            </a>
          </Link>
          <a href="#" onClick={toggleMenu} className="text-white">
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </a>
        </div>
        <nav className="flex flex-col pt-10 place-items-center">
          <ul className="flex flex-col w-full pb-10 space-y-6 text-xs tracking-widest text-center text-white uppercase border-0 border-b border-gray-600">
            <li>
              <Link href="/events">
                <a onClick={toggleMenu} href="#">
                  Tickets and Events
                </a>
              </Link>
            </li>
            <li>Visit</li>
            <li>Contact Us</li>
          </ul>
          <div className="pt-4 pb-4 font-serif text-sm text-center text-white">
            Connect with JPG
          </div>
          <div className="flex pb-6 space-x-8 text-center text-gray-900 place-items-center">
            <a href="#">
              <svg
                className="w-6 h-6"
                viewBox="0 0 16.5 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 17.7 27 V 17 h 3.4 l 0.5 -3.9 h -3.9 v -2.5 c 0 -1.1 0.3 -1.9 1.9 -1.9 l 2.1 0 V 5.2 c -0.4 0 -1.6 -0.2 -3 -0.2 c -3 0 -5 1.8 -5 5.2 v 2.9 h -3.4 V 17 h 3.4 v 10 H 17.7 Z"
                  fill="currentColor"
                  transform="matrix(1.45 0 0 1.45 -14.935 -7.2)"
                ></path>
              </svg>
            </a>
            <a href="#">
              <svg
                className="w-6 h-6"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                  fill="currentColor"
                ></path>
              </svg>
            </a>
          </div>
        </nav>
      </div>
      <div className="px-2 py-2 text-center text-black bg-blue-900">
        {/* <p className="text-sm font-light">Event Updates</p> */}
      </div>
      <header className="flex items-center justify-between px-4 pt-1 pb-2 bg-white">
        <div className="flex">
          <Link href="/">
            <a href="#" className="focus:outline-red">
              <img className="h-10 p-1 md:h-16" src="/video-logo-dk.png" />
            </a>
          </Link>
        </div>
        <nav className="flex flex-row place-items-center">
          <div className="flex">
            <a href="#" className="p-4 focus:outline-red">
              <svg
                className="h-4 text-red-900 "
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </a>
          </div>
          <div className="flex">
            <p className="text-xs font-light tracking-widest uppercase">
              <Link href="/events">
                <a href="#" className="p-4 lg:hidden focus:outline-red ">
                  Events
                </a>
              </Link>
              <Link href="/events">
                <a href="#" className="hidden p-4 lg:block focus:outline-red ">
                  Tickets & Events
                </a>
              </Link>
            </p>
          </div>
          <div className="flex hidden lg:block">
            <p className="text-xs font-light tracking-widest uppercase">
              <a href="#" className="hidden p-4 lg:block focus:outline-red ">
                Visit
              </a>
            </p>
          </div>
          <div className="flex hidden lg:block">
            <p className="text-xs font-light tracking-widest uppercase">
              <a href="#" className="hidden p-4 lg:block focus:outline-red ">
                Contact Us
              </a>
            </p>
          </div>
          <div className="flex lg:hidden">
            <button
              onClick={toggleMenu}
              className="p-4 text-xs font-light tracking-widest uppercase focus:outline-red"
            >
              Menu
            </button>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header
