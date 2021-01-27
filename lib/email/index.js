import Mailgun from "mailgun-js"

const AUTH = {
  apiKey: process.env.NEXT_PUBLIC_MAILGUN_API,
  domain: "mail.jpgapps.org",
}

const EMAIL_URL =
  "https://jpg.secure.force.com/vg/services/apexrest/VirtualGala"

const Email = {
  async getEmails() {
    try {
      const data = await (await fetch(EMAIL_URL)).json()
      return data.emails
    } catch (e) {
      console.warn("Error retrieving emails from Salesforce", e)
      return []
    }
  },

  async verifyEmail(email) {
    try {
      const emails = await this.getEmails()
      return emails.includes(email)
    } catch (e) {
      return false
    }
  },

  async sendEmail({ email, message, subject }) {
    console.log("SENDING")
    try {
      const mailgun = new Mailgun(AUTH)
      const data = {
        //Specify email data
        from: "JPG Gala <ccomeaux@jpgacademy.org>",
        //The email to contact
        to: email,
        //Subject and text data
        subject: subject,
        html: message,
      }
      //Invokes the method to send emails given the above data with the helper library
      const res = await mailgun.messages().send(data)

      console.log(res)
    } catch (err) {
      console.log(err)
    }
  },

  async sendGalaEmail({ email, key }) {
    const message = `<p>Dear Patron of the Academy:</p>
<p>Thank you for your purchase of John Paul the Great's 14th Annual Veritas Lecture & Gala Dinner.  
Please save this confirmation email and access code link (see below). These can be used to access the streaming performance(s) only during showtime on the date(s) selected, and only by one device per ticket. Do NOT share the email or code with others. Each link and access code is specific to your purchase and will not work on more than one device, or at more than one household.</p>

<p>For information on how to connect your computer, phone or tablet to your TV please see: http://video.jpgapps.org/about/video-streaming</p>

<p>You will be able to view the live event on Sunday, March 13, 2021 at 7:00 pm using the link below.  </p>

<a href="https://video.jpgapps.org/gala/watch/${key}">https://video.jpgapps.org/gala/watch/${key}</a>
`
    const subject = "JPG Gala - Livestream Ticket Link"
    await this.sendEmail({ email, message, subject })
  },
}

export default Email
