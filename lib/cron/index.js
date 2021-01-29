import Email from "../email"
import DB from "../db"

const Cron = {
  async updateEmails() {
    try {
      const emails = await Email.getEmails()
      const results = await Promise.all(emails.map(addEmailToDbAndEmail))
      console.log("CRON::updateEmails():", results)
      return true
    } catch (error) {
      console.warn(error)
      return false
    }
  },
}

const addEmailToDbAndEmail = async email => {
  try {
    const emailExists = await DB.hasEmailRecord(email)
    let msg = [emailExists ? "Email exists in DB" : "Email doesn't exist in DB"]
    if (!emailExists) {
      const link = await DB.setEmailRecord(email)
      msg.push(`Email added with key: ${link.key}`)
      await Email.sendGalaEmail({ email, key: link.key })
      msg.push(`Email message sent to ${link.email}`)
    }
    return { email, msg }
  } catch (error) {
    console.warn(`CRON: Error adding ${email} to the DB.`, error)
    return { email, msg: "Error" }
  }
}

export default Cron
