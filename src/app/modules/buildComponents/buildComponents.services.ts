/* eslint-disable @typescript-eslint/no-explicit-any */

import { PrismaClient, BuildComponents } from '@prisma/client'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { paginationHelpers } from '../../../helpers/paginationHelper'

const prisma = new PrismaClient()

const createBuildComponent = async (
  data: BuildComponents,
): Promise<IGenericResponse<BuildComponents>> => {
  const newBuildComponent = await prisma.buildComponents.create({
    data,
  })

  return {
    data: newBuildComponent,
  }
}

const getBuildComponents = async (
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<BuildComponents[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)
  const BuildComponents = await prisma.buildComponents.findMany({
    include: {
      components: {
        include: {
          category: true,
        },
      },
      builder: true,
    },
    take: limit,
    skip,
    orderBy: {
      [sortBy]: sortOrder,
    },
  })
  const total = await prisma.buildComponents.count()
  return {
    meta: {
      page,
      limit,
      total: total,
    },
    data: BuildComponents,
  }
}

const getBuildComponent = async (
  id: number | string,
): Promise<IGenericResponse<BuildComponents | null>> => {
  const BuildComponent = await prisma.buildComponents.findUnique({
    where: { id: Number(id) },
    include: {
      components: {
        include: {
          category: true,
        },
      },
      builder: true,
    },
  })

  return {
    data: BuildComponent,
  }
}

const updateBuildComponent = async (
  id: number | string,
  data: BuildComponents,
): Promise<IGenericResponse<BuildComponents | null>> => {
  const updatedBuildComponent = await prisma.$transaction(async prisma => {
    const buildComponent = await prisma.buildComponents.findUnique({
      where: { id: Number(id) },
    })
    if (data.buildId && buildComponent?.buildId !== data.buildId) {
      throw new Error('You cannot change the builder id')
    }
    const updatedBuildComponent = await prisma.buildComponents.update({
      where: { id: Number(id) },
      data,
    })
    return updatedBuildComponent
  })

  return {
    data: updatedBuildComponent,
  }
}

const deleteBuildComponent = async (
  id: number | string,
): Promise<IGenericResponse<BuildComponents | null>> => {
  const deletedBuildComponent = await prisma.buildComponents.delete({
    where: { id: Number(id) },
  })

  return {
    data: deletedBuildComponent,
  }
}

export const BuildComponentsServices = {
  createBuildComponent,
  getBuildComponents,
  getBuildComponent,
  updateBuildComponent,
  deleteBuildComponent,
}
