// Backend functions

// These will process

const getEmails = async () => {
  try {
    const emailUrl =
      "https://jpg.secure.force.com/vg/services/apexrest/VirtualGala"
    const data = await (await fetch(emailUrl)).json()
    return data.emails
  } catch (e) {
    console.warn("Error retrieving emails from Salesforce", e)
    return []
  }
}

const verifyEmail = async email => {
  try {
    const emails = await getEmails()
    return emails.includes(email)
  } catch (e) {
    return false
  }
}

module.exports = { getEmails, verifyEmail }
