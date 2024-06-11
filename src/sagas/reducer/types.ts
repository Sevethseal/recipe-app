import { Recipe } from '../../components/RecipeTemplate/types'
import { UniqueRecipeResponse } from '../../pages/ViewRecipe/types'

interface FirebaseRecipeDocs {
  id: string
  data: () => Recipe
}
export interface RecipeListResponse {
  docs: FirebaseRecipeDocs[] // Define a specific type for docs if known
}

export interface InitialLoginState {
  currentUser: null | unknown
  isLoading: boolean
}

export interface InitialRecipeState {
  recipe: UniqueRecipeResponse | null
}

export interface ListRecipeReducer {
  recipeListResponse: RecipeListResponse | null
}

export interface ReduxState {
  login: InitialLoginState
  uniqueRecipe: InitialRecipeState
  recipeList: ListRecipeReducer
}
