import Mailgun from "mailgun-js"

const AUTH = {
  apiKey: process.env.MAILGUN_API,
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

  async sendEmail({ email, message, subject, attachments = [] }) {
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
        attachments,
      }
      //Invokes the method to send emails given the above data with the helper library
      const res = await mailgun.messages().send(data)

      return res
    } catch (err) {
      console.log(err)
      return false
    }
  },

  async sendGalaEmail({ email, key }) {
    const message = `<img src="https://video.jpgapps.org/images/jpg-email-logo-sm.png" />
<p>Thank you for purchasing a Livestream ticket to JPG’s Veritas Lecture & Gala, with guest speaker Fr. Donald Calloway.</p>
<p><b>Event Details:</b><br />
JPG's 2021 Veritas Lecture and Gala<br />
Saturday, March 13, 2021<br /
Livestream<br />
7:40 p.m. - 9:15 p.m.<br />
</p>
<p>Please save this confirmation email and access code link (see below). These can be used to access the streaming performance(s) only during showtime on the date(s) selected, and only by one device per ticket. Please <b>Do NOT</b> share the email or code with others. Each link and access code is specific to your purchase and will not work on more than one device, or at more than one household.</p>

<p>For information on how to connect your computer, phone or tablet to your TV please see: http://video.jpgapps.org/about/video-streaming</p>

<p>You will be able to view the live event on Sunday, March 13, 2021 at 7:40 p.m. using the link below.</p>

<a href="https://video.jpgapps.org/gala/watch/${key}">https://video.jpgapps.org/gala/watch/${key}</a>
`

    const attachments = [
      {
        filename: "jpg-email-logo-sm.png",
        path: "../../public/images/jpg-email-logo-sm.png",
        cid: "unique@jpgEmailLogo.img", //same cid value as in the html img src
      },
    ]
    const subject = "JPG Gala - Livestream Ticket Link"
    await this.sendEmail({ email, message, subject, attachments })
  },
}

export default Email
