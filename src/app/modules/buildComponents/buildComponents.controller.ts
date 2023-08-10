import { BuildComponents } from '@prisma/client'
import sendResponse from '../../../shared/sendResponse'
import { BuildComponentsServices } from './buildComponents.services'
import catchAsync from '../../../shared/catchAsync'
import { Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'

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
      data: result,
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
      data: result,
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
      data: result,
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
      data: result,
    })
  },
)

const getBuildComponents: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await BuildComponentsServices.getBuildComponents()

    sendResponse<BuildComponents[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'BuildComponents fetched successfully!',
      data: result,
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
