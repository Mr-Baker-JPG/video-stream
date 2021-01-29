import { PrismaClient } from "@prisma/client"
// import this.prisma from "./prisma"

const DB = {
  prisma: null,
  async hasActiveKey(key) {
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
      return firstLink.key === key
    } catch (error) {
      console.warn(error)
      return false
    }
    return false
  },
  async hasEmailRecord(email) {
    this.prisma = this.prisma || new PrismaClient()
    try {
      const emailCount = await this.prisma.link.count({
        where: { email },
      })
      return emailCount > 0
    } catch (error) {
      console.warn(error)
      return false
    }
  },
  async setEmailRecord(email) {
    this.prisma = this.prisma || new PrismaClient()
    try {
      const link = await this.prisma.link.create({
        data: { email: email },
      })
      return link
    } catch (err) {
      console.log(err)
      return false
    }
  },
  async checkKeyAndIp(key, ip) {
    this.prisma = this.prisma || new PrismaClient()
    try {
      const isKeyActive = await this.hasActiveKey(key)
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
  async getActiveIp(key) {
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
