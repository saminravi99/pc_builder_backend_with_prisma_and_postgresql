/* eslint-disable @typescript-eslint/no-explicit-any */

import { PrismaClient, Categories } from '@prisma/client'

const prisma = new PrismaClient()

const createCategory = async (data: Categories): Promise<Categories> => {
  const newCategory = await prisma.categories.create({
    data,
  })

  return newCategory
}

const updateCategory = (
  id: number | string,
  data: Categories,
): Promise<Categories | null> => {
  const updatedCategory = prisma.categories.update({
    where: { id: Number(id) },
    data,
  })

  return updatedCategory
}

const deleteCategory = (id: number | string): Promise<Categories | null> => {
  const deletedCategory = prisma.categories.delete({
    where: { id: Number(id) },
  })

  return deletedCategory
}

const getCategory = (id: number | string): Promise<Categories | null> => {
  const category = prisma.categories.findUnique({
    where: { id: Number(id) },
  })

  return category
}

const getCategories = (): Promise<Categories[]> => {
  const categories = prisma.categories.findMany()

  return categories
}

export const CategoriesServices = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
}
