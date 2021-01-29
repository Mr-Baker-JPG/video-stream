import React from "react"

const ScrollToTop = () => {
  const [showScroll, setShowScroll] = React.useState(false)

  React.useEffect(
    function mount() {
      const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset < 200) {
          setShowScroll(true)
        } else if (showScroll && window.pageYOffset >= 200) {
          setShowScroll(false)
        }
      }

      const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }

      window.addEventListener("scroll", checkScrollTop)

      return () => window.removeEventListener("scroll", checkScrollTop, false)
    },
    [showScroll]
  )

  return (
    <div
      className={`lg:hidden ${
        showScroll && "hidden"
      } fixed flex w-5 h-5 text-center bg-red-900 rounded-full opacity-90 bottom-1 right-1 place-items-center`}
    >
      <a href="#" className="m-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-4 h-4 text-gray-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </a>
    </div>
  )
}

export default ScrollToTop
