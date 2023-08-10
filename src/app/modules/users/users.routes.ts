import express from 'express'
import { UserController } from './users.controller'
const router = express.Router()

router.post('/create-user', UserController.createUser)

router.get('/', UserController.getUsers)

router.get('/:id', UserController.getUser)

router.patch('/:id', UserController.updateUser)

router.delete('/:id', UserController.deleteUser)

export const UserRoutes = router
