const Footer = () => {
  return (
    <footer className="flex flex-col pt-8 bg-gray-400  place-items-center">
      <div className="pb-4 font-serif text-lg">Connect with JPG</div>
      <div className="flex pb-6 space-x-8 text-center place-items-center">
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
      <nav className="text-xs">
        <ul className="flex flex-col space-y-2 text-center">
          <li>Tickets and Events</li>
          <li>Visit</li>
          <li>Contact Us</li>
        </ul>
      </nav>
      <div className="px-4 py-8 font-thin uppercase text-xss">
        © 2021 John Paul the Great Academy | 1522 Carmel Drive, Lafayette, LA
      </div>
    </footer>
  )
}

export default Footer
