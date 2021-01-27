import { Cron } from "../../lib"

export default async (req, res) => {
  const { method, body } = req
  switch (method) {
    case "GET":
      try {
        await Cron.updateEmails()
        res.status(200).end(`Success`)
        return
      } catch (err) {
        console.log(err)
        res.status(500).end(`Failure`)
        return
      }
    default:
      res.setHeader("Allow", ["GET"])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}
