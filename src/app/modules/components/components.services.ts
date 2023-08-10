/* eslint-disable @typescript-eslint/no-explicit-any */

import { PrismaClient, Components } from '@prisma/client'

const prisma = new PrismaClient()

const createComponent = async (data: Components): Promise<Components> => {
  const newComponent = await prisma.components.create({
    data,
  })

  return newComponent
}

const updateComponent = (
  id: number | string,
  data: Components,
): Promise<Components | null> => {
  const updatedComponent = prisma.components.update({
    where: { id: Number(id) },
    data,
  })

  return updatedComponent
}

const deleteComponent = (id: number | string): Promise<Components | null> => {
  const deletedComponent = prisma.components.delete({
    where: { id: Number(id) },
  })

  return deletedComponent
}

const getComponent = (id: number | string): Promise<Components | null> => {
  const Component = prisma.components.findUnique({
    where: { id: Number(id) },
  })

  return Component
}

const getComponents = (): Promise<Components[]> => {
  const Components = prisma.components.findMany()

  return Components
}

export const ComponentServices = {
  createComponent,
  updateComponent,
  deleteComponent,
  getComponent,
  getComponents,
}

export const ComponentsServices = {
  createComponent,
  getComponents,
  getComponent,
  updateComponent,
  deleteComponent,
}
