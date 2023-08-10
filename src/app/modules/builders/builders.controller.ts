import { Builder } from '@prisma/client'
import sendResponse from '../../../shared/sendResponse'
import { BuildersServices } from './builders.services'
import catchAsync from '../../../shared/catchAsync'
import { Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'

const createBuilder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...BuilderData } = req.body
    const result = await BuildersServices.createBuilder(BuilderData)

    sendResponse<Builder>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Builder created successfully!',
      data: result,
    })
  },
)

const updateBuilder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const { ...BuilderData } = req.body
    const result = await BuildersServices.updateBuilder(id, BuilderData)

    sendResponse<Builder>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Builder updated successfully!',
      data: result,
    })
  },
)

const deleteBuilder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await BuildersServices.deleteBuilder(id)

    sendResponse<Builder>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Builder deleted successfully!',
      data: result,
    })
  },
)

const getBuilder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await BuildersServices.getBuilder(id)

    sendResponse<Builder>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Builder fetched successfully!',
      data: result,
    })
  },
)

const getBuilders: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await BuildersServices.getBuilders()

    sendResponse<Builder[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Builders fetched successfully!',
      data: result,
    })
  },
)

export const BuilderController = {
  createBuilder,
  updateBuilder,
  deleteBuilder,
  getBuilder,
  getBuilders,
}

export const BuildersController = {
  createBuilder,
  getBuilders,
  getBuilder,
  updateBuilder,
  deleteBuilder,
}
