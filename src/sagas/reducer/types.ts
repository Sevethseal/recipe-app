export interface InitialLoginState {
  currentUser: null | unknown
}

export interface InitialRecipeState {
  recipe: null | unknown
}

export interface ListRecipeReducer {
  recipeListResponse: null | unknown
}

export interface ReduxState {
  login: InitialLoginState
  uniqueRecipe: InitialRecipeState
  recipeList: ListRecipeReducer
}
