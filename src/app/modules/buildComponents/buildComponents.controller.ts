import { BuildComponents } from '@prisma/client'
import sendResponse from '../../../shared/sendResponse'
import { BuildComponentsServices } from './buildComponents.services'
import catchAsync from '../../../shared/catchAsync'
import { Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'
import { paginationFields } from '../../../constants/pagination'
import pick from '../../../shared/pick'
import { IPaginationOptions } from '../../../interfaces/pagination'

const createBuildComponent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...BuildComponentData } = req.body
    const result = await BuildComponentsServices.createBuildComponent(
      BuildComponentData,
    )

    sendResponse<BuildComponents>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'BuildComponent created successfully!',
      data: result.data,
    })
  },
)

const getBuildComponents: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, paginationFields)
    const result = await BuildComponentsServices.getBuildComponents(
      paginationOptions as IPaginationOptions,
    )

    sendResponse<BuildComponents[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'BuildComponents fetched successfully!',
      data: result.data,
      meta: result.meta,
    })
  },
)

const getBuildComponent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await BuildComponentsServices.getBuildComponent(id)

    sendResponse<BuildComponents>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'BuildComponent fetched successfully!',
      data: result.data,
    })
  },
)

const updateBuildComponent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const { ...BuildComponentData } = req.body
    const result = await BuildComponentsServices.updateBuildComponent(
      id,
      BuildComponentData,
    )

    sendResponse<BuildComponents>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'BuildComponent updated successfully!',
      data: result.data,
    })
  },
)

const deleteBuildComponent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await BuildComponentsServices.deleteBuildComponent(id)

    sendResponse<BuildComponents>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'BuildComponent deleted successfully!',
      data: result.data,
    })
  },
)

export const BuildComponentsController = {
  createBuildComponent,
  getBuildComponents,
  getBuildComponent,
  updateBuildComponent,
  deleteBuildComponent,
}
