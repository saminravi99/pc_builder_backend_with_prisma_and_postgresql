/* eslint-disable @typescript-eslint/no-explicit-any */

import { PrismaClient, Components } from '@prisma/client'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { componentsSearchableFields } from './components.constants'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IComponentsFilters } from './components.interface'
import { IGenericResponse } from '../../../interfaces/common'

const prisma = new PrismaClient()

const createComponent = async (
  data: Components,
): Promise<IGenericResponse<Components>> => {
  const newComponent = await prisma.components.create({
    data,
    include: {
      category: true,
    },
  })
  return {
    data: newComponent,
  }
}

const getComponents = async (
  filters: IComponentsFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<Components[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      OR: componentsSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    })
  }

  // Handle filters
  if (filtersData) {
    const filterKeys = Object.keys(filtersData) as (keyof typeof filtersData)[]
    filterKeys.forEach(key => {
      if (filtersData[key]) {
        const filter: Record<string, any> = {}
        filter[key] = { equals: filtersData[key] }
        andConditions.push(filter)
      }
    })
  }

  // handle sorting
  let orderBy = {}
  if (sortBy && sortOrder) {
    orderBy = {
      [sortBy]: sortOrder,
    }
  }

  let whereCondition = {}

  if (andConditions.length > 0) {
    whereCondition = {
      AND: andConditions,
    }
  }

  //so AND condition looks like
  const cond = {
    AND: [
      {
        OR: [
          {
            name: {
              contains: 'searchTerm',
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: 'searchTerm',
              mode: 'insensitive',
            },
          },
        ],
      },
      {
        category: {
          equals: 'category',
        },
      },
      {
        brand: {
          equals: 'brand',
        },
      },
      {
        model: {
          equals: 'model',
        },
      },
      {
        price: {
          equals: 100,
        },
      },
      {
        price: {
          lte: 100,
        },
      },
      {
        price: {
          gte: 100,
        },
      },
      {
        price: {
          in: [100, 200],
        },
      },
      {
        price: {
          notIn: [100, 200],
        },
      },
      {
        price: {
          lt: 100,
        },
      },
      {
        price: {
          gt: 100,
        },
      },
      {
        price: {
          not: 100,
        },
      },
      {
        price: {
          not: {
            equals: 100,
          },
        },
      },
      {
        price: {
          not: {
            in: [100, 200],
          },
        },
      },
      {
        price: {
          not: {
            lt: 100,
          },
        },
      },
      {
        price: {
          not: {
            gt: 100,
          },
        },
      },
    ],
  }
  console.log(cond)
  const components = await prisma.components.findMany({
    where: whereCondition,
    include: {
      category: true,
      reviews: {
        include: {
          users: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      },
    },
    orderBy,
    skip,
    take: limit,
  })

  const total = await prisma.components.count({
    where: whereCondition,
  })

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: components,
  }
}

const getComponent = async (
  id: number | string,
): Promise<IGenericResponse<Components | null>> => {
  const component = await prisma.components.findUnique({
    where: { id: Number(id) },
    include: {
      category: true,
      reviews: true,
    },
  })
  return {
    data: component,
  }
}

const updateComponent = async (
  id: number | string,
  data: Components,
): Promise<Components | null> => {
  const updatedComponent = prisma.components.update({
    where: { id: Number(id) },
    include: {
      category: true,
      reviews: {
        include: {
          users: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      },
    },
    data,
  })

  return updatedComponent
}

const deleteComponent = async (
  id: number | string,
): Promise<Components | null> => {
  const deletedComponent = prisma.components.delete({
    where: { id: Number(id) },
    include: {
      category: true,
      reviews: {
        include: {
          users: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      },
    },
  })

  return deletedComponent
}

export const ComponentsServices = {
  createComponent,
  getComponents,
  getComponent,
  updateComponent,
  deleteComponent,
}
