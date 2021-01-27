import { PrismaClient } from "@prisma/client"
// const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient({
  log: ["query", "info", "warn"],
  errorFormat: "pretty",
})
const DB = {
  async hasActiveKey(key) {
    try {
      const link = await prisma.link.findFirst({
        where: {
          key,
        },
      })
      const firstLink = await prisma.link.findFirst({
        where: {
          email: link.email,
        },
        orderBy: {
          created_at: "desc",
        },
      })
      console.log(firstLink, link, key)
      return firstLink.key === key
    } catch (error) {
      console.log(error)
      return false
    }
    return false
  },
  async hasEmailRecord(email) {
    const emailCount = await prisma.link.count({
      where: { email },
    })
    console.log(emailCount)
    return emailCount > 0
  },
  async setEmailRecord(email) {
    try {
      const link = await prisma.link.create({
        data: { email: email },
      })
      return link
    } catch (err) {
      console.log(err)
      return false
    }
  },
}

export default DB