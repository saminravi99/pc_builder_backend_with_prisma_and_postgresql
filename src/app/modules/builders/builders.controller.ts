import { Builder } from '@prisma/client'
import sendResponse from '../../../shared/sendResponse'
import { BuildersServices } from './builders.services'
import catchAsync from '../../../shared/catchAsync'
import { Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'
import { paginationFields } from '../../../constants/pagination'
import pick from '../../../shared/pick'
import { IPaginationOptions } from '../../../interfaces/pagination'

const createBuilder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { buildComponentsData, ...builderData } = req.body
    const result = await BuildersServices.createBuilder(
      builderData,
      buildComponentsData,
    )

    sendResponse<Builder>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Builder created successfully!',
      data: result.data,
    })
  },
)

const getBuilders: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, paginationFields)
    const result = await BuildersServices.getBuilders(
      paginationOptions as IPaginationOptions,
    )

    sendResponse<Builder[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Builders fetched successfully!',
      data: result.data,
      meta: result.meta,
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
      data: result.data,
    })
  },
)

const updateBuilder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const { buildComponentsData, ...builderData } = req.body
    const result = await BuildersServices.updateBuilder(
      id,
      builderData,
      buildComponentsData,
    )

    sendResponse<Builder>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Builder updated successfully!',
      data: result.data,
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
      data: result.data,
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
