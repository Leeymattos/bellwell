import { PrismaClient, Room } from '@prisma/client'

const prisma = new PrismaClient()

export async function getRooms() {
  const rooms = await prisma.room.findMany()

  return rooms;
}

export async function createRoom(Room: Room): Promise<Room> {
  const room = await prisma.room.create({
    data: Room
  })

  return room
}