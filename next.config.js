module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/gala",
        permanent: false,
      },
      {
        source: "/events",
        destination: "/gala",
        permanent: false,
      },
    ]
  },
}
