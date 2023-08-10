/* eslint-disable @typescript-eslint/no-explicit-any */

import { PrismaClient, Builder, BuildComponents } from '@prisma/client'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { paginationHelpers } from '../../../helpers/paginationHelper'

const prisma = new PrismaClient()

const createBuilder = async (
  builderData: Builder,
  buildComponentsData: BuildComponents[],
): Promise<IGenericResponse<Builder>> => {
  const builderWithComponents = await prisma.$transaction(async prisma => {
    const builder = await prisma.builder.create({
      data: {
        ...builderData,
        buildComponents: {
          create: buildComponentsData,
        },
      },
      include: {
        buildComponents: {
          include: {
            components: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    })

    return builder
  })

  return {
    data: builderWithComponents,
  }
}

const getBuilders = async (
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<Builder[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)
  const builders = await prisma.builder.findMany({
    include: {
      buildComponents: {
        include: {
          components: {
            include: {
              category: true,
            },
          },
        },
      },
    },
    take: limit,
    skip,
    orderBy: {
      [sortBy]: sortOrder,
    },
  })
  const total = await prisma.builder.count()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: builders,
  }
}

const getBuilder = async (
  id: number | string,
): Promise<IGenericResponse<Builder | null>> => {
  const Builder = await prisma.builder.findUnique({
    where: { id: Number(id) },
    include: {
      buildComponents: {
        include: {
          components: {
            include: {
              category: true,
            },
          },
        },
      },
    },
  })

  return {
    data: Builder,
  }
}

const updateBuilder = async (
  id: number | string,
  builderData: Builder,
  buildComponentsData: BuildComponents[],
): Promise<IGenericResponse<Builder | null>> => {
  const updatedBuilder = await prisma.$transaction(async prisma => {
    const builder = await prisma.builder.update({
      where: { id: Number(id) },
      data: {
        ...builderData,
        buildComponents: {
          deleteMany: {},
          create: buildComponentsData,
        },
      },
      include: {
        buildComponents: {
          include: {
            components: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    })

    return builder
  })

  return {
    data: updatedBuilder,
  }
}

const deleteBuilder = async (
  id: number | string,
): Promise<IGenericResponse<Builder | null>> => {
  const deletedBuilder = await prisma.$transaction(async prisma => {
    // Find the builder's associated build component IDs
    const builder = await prisma.builder.findUnique({
      where: { id: Number(id) },
      include: {
        buildComponents: true,
      },
    })

    // Delete associated build components
    if (builder) {
      const buildComponentIds = builder.buildComponents.map(
        component => component.id,
      )
      await prisma.buildComponents.deleteMany({
        where: { id: { in: buildComponentIds } },
      })
    }

    // Delete the builder after its associated build components are deleted
    await prisma.builder.delete({
      where: { id: Number(id) },
    })

    return builder
  })

  return {
    data: deletedBuilder,
  }
}

export const BuildersServices = {
  createBuilder,
  getBuilders,
  getBuilder,
  updateBuilder,
  deleteBuilder,
}
