import { Reviews } from '@prisma/client'
import sendResponse from '../../../shared/sendResponse'
import { ReviewsServices } from './reviews.services'
import catchAsync from '../../../shared/catchAsync'
import { Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'

const createReview: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...ReviewData } = req.body
    const result = await ReviewsServices.createReview(ReviewData)

    sendResponse<Reviews>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review created successfully!',
      data: result,
    })
  },
)

const updateReview: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const { ...ReviewData } = req.body
    const result = await ReviewsServices.updateReview(id, ReviewData)

    sendResponse<Reviews>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review updated successfully!',
      data: result,
    })
  },
)

const deleteReview: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await ReviewsServices.deleteReview(id)

    sendResponse<Reviews>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review deleted successfully!',
      data: result,
    })
  },
)

const getReview: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await ReviewsServices.getReview(id)

    sendResponse<Reviews>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review fetched successfully!',
      data: result,
    })
  },
)

const getReviews: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ReviewsServices.getReviews()

    sendResponse<Reviews[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Reviews fetched successfully!',
      data: result,
    })
  },
)

export const ReviewsController = {
  createReview,
  updateReview,
  deleteReview,
  getReviews,
  getReview,
}
