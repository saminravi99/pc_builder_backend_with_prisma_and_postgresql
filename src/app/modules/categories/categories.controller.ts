import { Categories } from '@prisma/client'
import sendResponse from '../../../shared/sendResponse'
import { CategoriesServices } from './categories.services'
import catchAsync from '../../../shared/catchAsync'
import { Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { IPaginationOptions } from '../../../interfaces/pagination'

const createCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...CategoryData } = req.body
    const result = await CategoriesServices.createCategory(CategoryData)

    sendResponse<Categories>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category created successfully!',
      data: result.data,
    })
  },
)

const getCategories: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, paginationFields)

    const result = await CategoriesServices.getCategories(
      paginationOptions as IPaginationOptions,
    )

    sendResponse<Categories[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Categorys fetched successfully!',
      data: result.data,
      meta: result.meta,
    })
  },
)

const getCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await CategoriesServices.getCategory(id)

    sendResponse<Categories>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category fetched successfully!',
      data: result.data,
    })
  },
)

const updateCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const { ...CategoryData } = req.body

    const result = await CategoriesServices.updateCategory(id, CategoryData)

    sendResponse<Categories>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category updated successfully!',
      data: result.data,
    })
  },
)

const deleteCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await CategoriesServices.deleteCategory(id)

    sendResponse<Categories>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category deleted successfully!',
      data: result.data,
    })
  },
)

export const CategoriesController = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
}
