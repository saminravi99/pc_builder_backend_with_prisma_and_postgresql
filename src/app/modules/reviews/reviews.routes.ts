import express from 'express'
import { ReviewsController } from './reviews.controller'
const router = express.Router()

router.post('/create-user', ReviewsController.createReview)

router.get('/', ReviewsController.getReviews)

router.get('/:id', ReviewsController.getReview)

router.patch('/:id', ReviewsController.updateReview)

router.delete('/:id', ReviewsController.deleteReview)

export const ReviewRoutes = router
