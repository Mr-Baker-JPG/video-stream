import { Email } from "../../lib"
export default async (req, res) => {
  const { method, body } = req
  const email = JSON.parse(body).email

  switch (method) {
    case "POST":
      const isVerified = await Email.verifyEmail(email)
      if (isVerified) {
        Email.sendEmail(email)
        res.status(200).json({ msg: `Authorized email: ${email}` })
        return
      }
      res.status(401).json({ msg: `Unauthorized email: ${email}` })
      break
    default:
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}
