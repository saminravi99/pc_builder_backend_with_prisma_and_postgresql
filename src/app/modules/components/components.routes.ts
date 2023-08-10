import express from 'express'
import { ComponentsController } from './components.controller'
const router = express.Router()

router.post('/create-component', ComponentsController.createComponent)

router.get('/', ComponentsController.getComponents)

router.get('/:id', ComponentsController.getComponent)

router.patch('/:id', ComponentsController.updateComponent)

router.delete('/:id', ComponentsController.deleteComponent)

export const ComponentsRoutes = router
