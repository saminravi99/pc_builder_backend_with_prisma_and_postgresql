/* eslint-disable @typescript-eslint/no-explicit-any */

import { PrismaClient, Reviews } from '@prisma/client'
import { IGenericResponse } from '../../../interfaces/common'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IPaginationOptions } from '../../../interfaces/pagination'

const prisma = new PrismaClient()

const createReview = async (data: Reviews): Promise<Reviews> => {
  const newReview = await prisma.reviews.create({
    data,
  })

  return newReview
}

const getReviews = async (
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<Reviews[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)
  const reviews = await prisma.reviews.findMany({
    include: {
      components: {
        include: {
          category: true,
        },
      },
      users: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
    take: limit,
    skip,
    orderBy: {
      [sortBy]: sortOrder,
    },
  })
  const total = await prisma.reviews.count()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: reviews,
  }
}
const getReview = async (
  id: number | string,
): Promise<IGenericResponse<Reviews | null>> => {
  const review = await prisma.reviews.findUnique({
    where: { id: Number(id) },
    include: {
      components: true,
      users: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
  })
  return {
    data: review,
  }
}

const updateReview = async (
  id: number | string,
  data: Reviews,
): Promise<IGenericResponse<Reviews | null>> => {
  const updatedReview = await prisma.reviews.update({
    where: { id: Number(id) },
    data,
  })

  return {
    data: updatedReview,
  }
}

const deleteReview = async (
  id: number | string,
): Promise<IGenericResponse<Reviews | null>> => {
  const deletedReview = await prisma.reviews.delete({
    where: { id: Number(id) },
  })

  return {
    data: deletedReview,
  }
}

export const ReviewsServices = {
  createReview,
  updateReview,
  deleteReview,
  getReviews,
  getReview,
}
