/* eslint-disable @typescript-eslint/no-explicit-any */

import { PrismaClient, BuildComponents } from '@prisma/client'

const prisma = new PrismaClient()

const createBuildComponent = async (
  data: BuildComponents,
): Promise<BuildComponents> => {
  const newBuildComponent = await prisma.buildComponents.create({
    data,
  })

  return newBuildComponent
}

const updateBuildComponent = (
  id: number | string,
  data: BuildComponents,
): Promise<BuildComponents | null> => {
  const updatedBuildComponent = prisma.buildComponents.update({
    where: { id: Number(id) },
    data,
  })

  return updatedBuildComponent
}

const deleteBuildComponent = (
  id: number | string,
): Promise<BuildComponents | null> => {
  const deletedBuildComponent = prisma.buildComponents.delete({
    where: { id: Number(id) },
  })

  return deletedBuildComponent
}

const getBuildComponent = (
  id: number | string,
): Promise<BuildComponents | null> => {
  const BuildComponent = prisma.buildComponents.findUnique({
    where: { id: Number(id) },
  })

  return BuildComponent
}

const getBuildComponents = (): Promise<BuildComponents[]> => {
  const BuildComponents = prisma.buildComponents.findMany()

  return BuildComponents
}

export const BuildComponentsServices = {
  createBuildComponent,
  getBuildComponents,
  getBuildComponent,
  updateBuildComponent,
  deleteBuildComponent,
}
