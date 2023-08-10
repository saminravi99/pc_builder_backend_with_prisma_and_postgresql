/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'
import { UserRoutes } from '../modules/users/users.routes'
import { ComponentsRoutes } from '../modules/components/components.routes'
import { BuildComponentsRoutes } from '../modules/buildComponents/buildComponents.routes'
import { ReviewRoutes } from '../modules/reviews/reviews.routes'
import { BuildersRoutes } from '../modules/builders/builders.routes'
import { CategoriesRoutes } from '../modules/categories/categories.routes'

const router = express.Router()

const moduleRoutes: any[] = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/components',
    route: ComponentsRoutes,
  },
  {
    path: '/categories',
    route: CategoriesRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
  {
    path: '/builders',
    route: BuildersRoutes,
  },
  {
    path: '/build-components',
    route: BuildComponentsRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
