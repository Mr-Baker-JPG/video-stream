import Email from "../email"
import DB from "../db"

const Cron = {
  async updateEmails() {
    const emails = await Email.getEmails()
    console.log(emails)
    emails.forEach(async email => {
      const emailExists = await DB.hasEmailRecord(email)
      if (!emailExists) {
        const link = await DB.setEmailRecord(email)
        console.log(link)
        Email.sendGalaEmail({ email, key: link.key })
      }
    })
    return true
  },
}

export default Cron
