import { PrismaClient } from "@prisma/client"
// import this.prisma from "./prisma"

const DB = {
  prisma: null,
  async disconnect() {
    if (this.prisma) {
      // await this.prisma.disconnect()
    }
  },
  async getEmail(token) {
    // console.log("prisma", Boolean(this.prisma))
    this.prisma = this.prisma || new PrismaClient()
    try {
      const email = await this.prisma.link.findFirst({
        where: {
          key: token,
        },
        select: {
          email: true,
        },
      })
      return email.email
    } catch (error) {
      console.warn(error)
      return ""
    }
  },
  async getEmails() {
    // console.log("prisma", Boolean(this.prisma))
    this.prisma = this.prisma || new PrismaClient()
    try {
      const emails = await this.prisma.link.findMany({
        distinct: ["email"],
        where: {},
        select: {
          email: true,
          key: true,
          created_at: true,
        },
        orderBy: {
          created_at: "desc",
        },
      })
      return emails
    } catch (error) {
      console.warn(error)
      return []
    }
  },
  async hasActiveAdminKey(key) {
    // console.log("prisma", Boolean(this.prisma))
    this.prisma = this.prisma || new PrismaClient()
    if (key.length < 32 || key.length > 36) return false
    try {
      const link = await this.prisma.link.findFirst({
        where: {
          key,
          is_admin: true,
        },
      })
      if (!link) return false
      const firstLink = await this.prisma.link.findFirst({
        where: {
          email: link.email,
          is_admin: true,
        },
        orderBy: {
          created_at: "desc",
        },
      })
      this.disconnect()
      return firstLink.key === key
    } catch (error) {
      console.warn(error)
      this.disconnect()
      return false
    }
    return false
  },
  async hasActiveKey(key) {
    // console.log("prisma", Boolean(this.prisma))
    this.prisma = this.prisma || new PrismaClient()
    if (key.length < 32 || key.length > 36) return false
    try {
      const link = await this.prisma.link.findFirst({
        where: {
          key,
        },
      })
      if (!link) return false
      const firstLink = await this.prisma.link.findFirst({
        where: {
          email: link.email,
        },
        orderBy: {
          created_at: "desc",
        },
      })
      this.disconnect()
      return firstLink.key === key
    } catch (error) {
      this.disconnect()
      console.warn(error)
      return false
    }
    return false
  },
  async hasEmailRecord(email) {
    // console.log("prisma", Boolean(this.prisma))
    this.prisma = this.prisma || new PrismaClient()
    try {
      const emailCount = await this.prisma.link.count({
        where: { email },
      })
      this.disconnect()
      return emailCount > 0
    } catch (error) {
      this.disconnect()
      console.warn(error)
      return false
    }
  },
  async setEmailRecord(email) {
    // console.log("prisma", Boolean(this.prisma))
    this.prisma = this.prisma || new PrismaClient()
    try {
      const link = await this.prisma.link.create({
        data: { email: email },
      })
      this.disconnect()
      return link
    } catch (err) {
      console.log(err)
      return false
    }
  },
  async checkAdminKeyAndIp(key, ip) {
    // console.log("prisma", Boolean(this.prisma))
    this.prisma = this.prisma || new PrismaClient()
    try {
      const isKeyActive = await this.hasActiveAdminKey(key)
      let activeIp = await this.getActiveIp(key)
      if (!activeIp) {
        activeIp = await this.logIp(ip, key)
      }
      const isIpActive = !activeIp || activeIp === ip
      return { isKeyActive, isIpActive }
    } catch (error) {
      return { isKeyActive: false, isIpActive: false }
    }
  },
  async checkKeyAndIp(key, ip) {
    // console.log("prisma", Boolean(this.prisma))
    this.prisma = this.prisma || new PrismaClient()
    try {
      const isKeyActive = await this.hasActiveKey(key)
      let activeIp = await this.getActiveIp(key)
      const email = await this.getEmail(key)
      if (!activeIp) {
        activeIp = await this.logIp(ip, key)
      }
      const isIpActive = !activeIp || activeIp === ip
      this.disconnect()
      return { isKeyActive, isIpActive, email }
    } catch (error) {
      this.disconnect()
      return { isKeyActive: false, isIpActive: false, email: "" }
    }
  },
  async getActiveIp(key) {
    // console.log("prisma", Boolean(this.prisma))
    this.prisma = this.prisma || new PrismaClient()
    try {
      const access = await this.prisma.access.findFirst({
        where: {
          key,
        },
        orderBy: {
          accessed_at: "desc",
        },
      })
      return access.ip || false
    } catch (error) {
      return false
    }
  },
  async logIp(ip, key) {
    // console.log("prisma", Boolean(this.prisma))
    this.prisma = this.prisma || new PrismaClient()
    try {
      const access = await this.prisma.access.create({
        data: {
          ip,
          key,
        },
      })
      return access.ip
    } catch (error) {
      console.warn(error)
      return false
    }
  },
}

export default DB
