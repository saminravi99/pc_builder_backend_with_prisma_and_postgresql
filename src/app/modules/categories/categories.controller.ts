import { Categories } from '@prisma/client'
import sendResponse from '../../../shared/sendResponse'
import { CategoriesServices } from './categories.services'
import catchAsync from '../../../shared/catchAsync'
import { Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'

const createCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...CategoryData } = req.body
    const result = await CategoriesServices.createCategory(CategoryData)

    sendResponse<Categories>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category created successfully!',
      data: result,
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
      data: result,
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
      data: result,
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
      data: result,
    })
  },
)

const getCategories: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoriesServices.getCategories()

    sendResponse<Categories[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Categorys fetched successfully!',
      data: result,
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
