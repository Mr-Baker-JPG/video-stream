import { getEmails } from "../../lib"
export default async (req, res) => {
  if (req.method !== "POST") {
    res.statusCode = 500
    res.json({ msg: "Only POST method is accepted." })
  } else {
    const emails = await getEmails()

    if (!emails) {
      res.statusCode = 500
      res.json({ msg: "Error talking with server." })
    } else {
      res.statusCode = 200
      res.json(emails)
    }
  }
}
