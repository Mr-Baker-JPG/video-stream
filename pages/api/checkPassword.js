// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  const { method, body } = req
  switch (method) {
    case "POST":
      try {
        console.log(body)
        res.status(200).end(`Success`)
        return
      } catch (err) {
        console.log(err)
        res.status(500).end(`Failure`)
        return
      }

    default:
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}
