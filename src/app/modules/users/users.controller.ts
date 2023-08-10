import { Users } from '@prisma/client'
import sendResponse from '../../../shared/sendResponse'
import { UserServices } from './users.services'
import catchAsync from '../../../shared/catchAsync'
import { Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...userData } = req.body
    const result = await UserServices.createUser(userData)

    sendResponse<Users>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  },
)

const updateUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const { ...userData } = req.body
    const result = await UserServices.updateUser(id, userData)

    sendResponse<Users>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User updated successfully!',
      data: result,
    })
  },
)

const deleteUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await UserServices.deleteUser(id)

    sendResponse<Users>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User deleted successfully!',
      data: result,
    })
  },
)

const getUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await UserServices.getUser(id)

    sendResponse<Users>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User fetched successfully!',
      data: result,
    })
  },
)

const getUsers: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserServices.getUsers()

    sendResponse<Users[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    })
  },
)

export const UserController = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
}
