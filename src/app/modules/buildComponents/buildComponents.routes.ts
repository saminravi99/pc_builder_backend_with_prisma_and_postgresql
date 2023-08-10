import express from 'express'
import { BuildComponentsController } from './buildComponents.controller'
const router = express.Router()

router.post('/create-user', BuildComponentsController.createBuildComponent)

router.get('/', BuildComponentsController.getBuildComponents)

router.get('/:id', BuildComponentsController.getBuildComponent)

router.patch('/:id', BuildComponentsController.updateBuildComponent)

router.delete('/:id', BuildComponentsController.deleteBuildComponent)

export const BuildComponentsRoutes = router
