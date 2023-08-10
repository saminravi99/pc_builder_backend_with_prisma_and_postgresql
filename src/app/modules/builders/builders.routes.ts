import express from 'express'
import { BuildersController } from './builders.controller'
const router = express.Router()

router.post('/create-user', BuildersController.createBuilder)

router.get('/', BuildersController.getBuilders)

router.get('/:id', BuildersController.getBuilder)

router.patch('/:id', BuildersController.updateBuilder)

router.delete('/:id', BuildersController.deleteBuilder)

export const BuildersRoutes = router
