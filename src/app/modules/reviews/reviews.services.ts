/* eslint-disable @typescript-eslint/no-explicit-any */

import { PrismaClient, Reviews } from '@prisma/client'

const prisma = new PrismaClient()

const createReview = async (data: Reviews): Promise<Reviews> => {
  const newReview = await prisma.reviews.create({
    data,
  })

  return newReview
}

const updateReview = (
  id: number | string,
  data: Reviews,
): Promise<Reviews | null> => {
  const updatedReview = prisma.reviews.update({
    where: { id: Number(id) },
    data,
  })

  return updatedReview
}

const deleteReview = (id: number | string): Promise<Reviews | null> => {
  const deletedReview = prisma.reviews.delete({
    where: { id: Number(id) },
  })

  return deletedReview
}

const getReview = (id: number | string): Promise<Reviews | null> => {
  const Review = prisma.reviews.findUnique({
    where: { id: Number(id) },
  })

  return Review
}

const getReviews = (): Promise<Reviews[]> => {
  const Reviews = prisma.reviews.findMany()

  return Reviews
}

export const ReviewsServices = {
  createReview,
  updateReview,
  deleteReview,
  getReviews,
  getReview,
}
