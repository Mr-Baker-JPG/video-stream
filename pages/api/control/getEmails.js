import { DB } from "../../../lib"
export default async (req, res) => {
  if (req.method !== "GET") {
    res.statusCode = 500
    res.json({ msg: "Only GET method is accepted." })
  } else {
    const emails = await DB.getEmails()

    if (!emails) {
      res.statusCode = 500
      res.json({ msg: "Error talking with server." })
    } else {
      res.statusCode = 200
      res.json(emails)
    }
  }
}
