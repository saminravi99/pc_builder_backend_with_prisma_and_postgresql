/* eslint-disable @typescript-eslint/no-explicit-any */

import { PrismaClient, Builder } from '@prisma/client'

const prisma = new PrismaClient()

const createBuilder = async (data: Builder): Promise<Builder> => {
  const newBuilder = await prisma.builder.create({
    data,
  })

  return newBuilder
}

const updateBuilder = (
  id: number | string,
  data: Builder,
): Promise<Builder | null> => {
  const updatedBuilder = prisma.builder.update({
    where: { id: Number(id) },
    data,
  })

  return updatedBuilder
}

const deleteBuilder = (id: number | string): Promise<Builder | null> => {
  const deletedBuilder = prisma.builder.delete({
    where: { id: Number(id) },
  })

  return deletedBuilder
}

const getBuilder = (id: number | string): Promise<Builder | null> => {
  const Builder = prisma.builder.findUnique({
    where: { id: Number(id) },
  })

  return Builder
}

const getBuilders = (): Promise<Builder[]> => {
  const Builders = prisma.builder.findMany()

  return Builders
}

export const BuildersServices = {
  createBuilder,
  getBuilders,
  getBuilder,
  updateBuilder,
  deleteBuilder,
}
