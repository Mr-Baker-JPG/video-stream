import prisma from "./prisma"

const DB = {
  async hasActiveKey(key) {
    if (key.length < 32 || key.length > 36) return false
    try {
      const link = await prisma.link.findFirst({
        where: {
          key,
        },
      })
      if (!link) return false
      const firstLink = await prisma.link.findFirst({
        where: {
          email: link.email,
        },
        orderBy: {
          created_at: "desc",
        },
      })
      return firstLink.key === key
    } catch (error) {
      console.warn(error)
      return false
    }
    return false
  },
  async hasEmailRecord(email) {
    try {
      const emailCount = await prisma.link.count({
        where: { email },
      })
      return emailCount > 0
    } catch (error) {
      console.warn(error)
      return false
    }
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
  async logIp(ip) {},
}

export default DB
