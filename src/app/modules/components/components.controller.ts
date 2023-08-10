import { Components } from '@prisma/client'
import sendResponse from '../../../shared/sendResponse'
import { ComponentsServices } from './components.services'
import catchAsync from '../../../shared/catchAsync'
import { Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'
import { componentsFilterableFields } from './components.constants'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'

const createComponent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...ComponentData } = req.body
    const result = await ComponentsServices.createComponent(ComponentData)

    sendResponse<Components>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Component created successfully!',
      data: result,
    })
  },
)

const updateComponent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const { ...ComponentData } = req.body
    const result = await ComponentsServices.updateComponent(id, ComponentData)

    sendResponse<Components>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Component updated successfully!',
      data: result,
    })
  },
)

const deleteComponent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await ComponentsServices.deleteComponent(id)

    sendResponse<Components>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Component deleted successfully!',
      data: result,
    })
  },
)

const getComponent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await ComponentsServices.getComponent(id)

    sendResponse<Components>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Component fetched successfully!',
      data: result,
    })
  },
)

const getComponents: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, componentsFilterableFields)
    const paginationOptions = pick(req.query, paginationFields)

    const result = await ComponentsServices.getComponents(
      filters,
      paginationOptions,
    )

    sendResponse<Components[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Components fetched successfully!',
      data: result.data,
      meta: result.meta,
    })
  },
)

export const ComponentsController = {
  createComponent,
  getComponents,
  getComponent,
  updateComponent,
  deleteComponent,
}
