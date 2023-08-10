import express from 'express'
import { CategoriesController } from './categories.controller'
const router = express.Router()

router.post('/create-user', CategoriesController.createCategory)

router.get('/', CategoriesController.getCategories)

router.get('/:id', CategoriesController.getCategory)

router.patch('/:id', CategoriesController.updateCategory)

router.delete('/:id', CategoriesController.deleteCategory)

export const CategoriesRoutes = router
