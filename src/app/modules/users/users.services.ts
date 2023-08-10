/* eslint-disable @typescript-eslint/no-explicit-any */

import { PrismaClient, Users } from '@prisma/client'

const prisma = new PrismaClient()

const createUser = async (data: Users): Promise<Users> => {
  const newUser = await prisma.users.create({
    data,
  })

  return newUser
}

const updateUser = (
  id: number | string,
  data: Users,
): Promise<Users | null> => {
  const updatedUser = prisma.users.update({
    where: { id: Number(id) },
    data,
  })

  return updatedUser
}

const deleteUser = (id: number | string): Promise<Users | null> => {
  const deletedUser = prisma.users.delete({
    where: { id: Number(id) },
  })

  return deletedUser
}

const getUser = (id: number | string): Promise<Users | null> => {
  const user = prisma.users.findUnique({
    where: { id: Number(id) },
  })

  return user
}

const getUsers = (): Promise<Users[]> => {
  const users = prisma.users.findMany()

  return users
}

export const UserServices = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
}
