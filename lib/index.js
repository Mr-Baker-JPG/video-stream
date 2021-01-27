import DB from "./db"
import Email from "./email"
import Cron from "./cron"

/*
Retrieves emails from Salesforce
getEmails()

Checks to see if email is in the Salesforce Data
verifyEmail(email)


Sends an email
sendEmail({to, from, msg})

checks to see if the email is in the DB
hasEmailRecord(email)

setEmailRecord

composeEmail

Cron Job
 - Get Emails
 - Check to see if each email is already in DB
 - 

*/

module.exports = { Email, DB, Cron }
