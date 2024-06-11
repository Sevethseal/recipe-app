import loginReducer from './login'
import recipeReducer from './recipe'
import listRecipeReducer from './recipeList'

export default {
  login: loginReducer,
  uniqueRecipe: recipeReducer,
  recipeList: listRecipeReducer,
}
