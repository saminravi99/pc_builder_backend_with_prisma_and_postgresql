import { Reviews } from '@prisma/client'
import sendResponse from '../../../shared/sendResponse'
import { ReviewsServices } from './reviews.services'
import catchAsync from '../../../shared/catchAsync'
import { Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'
import { paginationFields } from '../../../constants/pagination'
import pick from '../../../shared/pick'
import { IPaginationOptions } from '../../../interfaces/pagination'

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

const getReviews: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, paginationFields)
    const result = await ReviewsServices.getReviews(
      paginationOptions as IPaginationOptions,
    )

    sendResponse<Reviews[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Reviews fetched successfully!',
      data: result.data,
      meta: result.meta,
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
      data: result.data,
      meta: result.meta,
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
      data: result.data,
      meta: result.meta,
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
      data: result.data,
      meta: result.meta,
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
