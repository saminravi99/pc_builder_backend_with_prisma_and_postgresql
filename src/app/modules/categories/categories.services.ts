/* eslint-disable @typescript-eslint/no-explicit-any */

import { PrismaClient, Categories } from '@prisma/client'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { paginationHelpers } from '../../../helpers/paginationHelper'

const prisma = new PrismaClient()

const createCategory = async (
  data: Categories,
): Promise<IGenericResponse<Categories>> => {
  const newCategory = await prisma.categories.create({
    data,
  })

  return {
    data: newCategory,
  }
}

const getCategories = async (
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<Categories[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)
  const categories = await prisma.categories.findMany({
    take: limit,
    skip,
    orderBy: {
      [sortBy]: sortOrder,
    },
  })
  const total = await prisma.categories.count()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: categories,
  }
}

const getCategory = async (
  id: number | string,
): Promise<IGenericResponse<Categories | null>> => {
  const category = await prisma.categories.findUnique({
    where: { id: Number(id) },
  })

  return {
    data: category,
  }
}

const updateCategory = async (
  id: number | string,
  data: Categories,
): Promise<IGenericResponse<Categories | null>> => {
  const updatedCategory = await prisma.categories.update({
    where: { id: Number(id) },
    data,
  })

  return {
    data: updatedCategory,
  }
}

const deleteCategory = async (
  id: number | string,
): Promise<IGenericResponse<Categories | null>> => {
  const deletedCategory = await prisma.categories.delete({
    where: { id: Number(id) },
  })

  return {
    data: deletedCategory,
  }
}

export const CategoriesServices = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
}
