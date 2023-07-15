import { AnyAction } from 'redux'
import { InitialRecipeState } from './types'

export const FETCH_RECIPE_ACTION = 'FETCH_RECIPE_ACTION'
export const FETCH_RECIPE_SUCCESS_ACTION = 'FETCH_RECIPE_SUCCESS_ACTION'
export const CLEAR_RECIPE_ACTION = 'CLEAR_RECIPE_ACTION'
export const CREATE_RECIPE_ACTION = 'CREATE_RECIPE_ACTION'
export const UPDATE_RECIPE_ACTION = 'UPDATE_RECIPE_ACTION'
export const DELETE_RECIPE_ACTION = 'DELETE_RECIPE_ACTION'

const initialRecipeState: InitialRecipeState = {
  recipe: null,
}

export const fetchRecipe = (id: string) => ({
  type: FETCH_RECIPE_ACTION,
  id,
})

export const fetchRecipeSuccess = (recipeResponse: unknown) => ({
  type: FETCH_RECIPE_SUCCESS_ACTION,
  recipeResponse,
})
export const clearRecipe = () => ({
  type: CLEAR_RECIPE_ACTION,
})
export const createRecipe = (recipe: unknown) => ({
  type: CREATE_RECIPE_ACTION,
  recipe,
})
export const updateRecipe = (id: string, recipe: unknown) => ({
  type: UPDATE_RECIPE_ACTION,
  id,
  recipe,
})
export const deleteRecipe = (id: string) => ({
  type: DELETE_RECIPE_ACTION,
  id,
})

const recipeReducer = (state = initialRecipeState, action: AnyAction) => {
  switch (action.type) {
    case FETCH_RECIPE_SUCCESS_ACTION: {
      const { recipeResponse } = action
      return {
        ...state,
        recipe: recipeResponse,
      }
    }
    case CLEAR_RECIPE_ACTION: {
      return initialRecipeState
    }
    default:
      return state
  }
}

export default recipeReducer
