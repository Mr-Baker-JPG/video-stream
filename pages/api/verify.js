import { Email, DB } from "../../lib"
export default async (req, res) => {
  const { method, body } = req
  const email = JSON.parse(body).email

  switch (method) {
    case "POST":
      const isVerified = await Email.verifyEmail(email)
      if (isVerified) {
        // get new Key
        try {
          const link = await DB.setEmailRecord(email)
          Email.sendGalaEmail({ email, key: link.key })
          res.status(200).json({
            type: "SUCCESS",
            msg: `New login link emailed to: ${email}`,
          })
        } catch (err) {
          res.status(500).json({
            type: "FAILURE",
            msg: `There was an error.  Please try again.`,
          })
        }
        return
      }
      res.status(401).json({
        type: "FAILURE",
        msg: `${email} is not found in the system.  Please try again.`,
      })
      break
    default:
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}
