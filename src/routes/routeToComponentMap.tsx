import { RouteProps } from 'react-router-dom'
import * as React from 'react'
import Home from '../pages/Home'
import AddRecipes from '../pages/addRecipes'
import ViewRecipes from '../pages/ViewRecipes'
import ViewRecipe from '../pages/ViewRecipe'

const routeToComponentMap: RouteProps[] = [
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/create',
    element: <AddRecipes />,
  },
  {
    path: '/view',
    element: <ViewRecipes />,
  },
  {
    path: '/recipe',
    element: <ViewRecipe />,
  },
]

export default routeToComponentMap
