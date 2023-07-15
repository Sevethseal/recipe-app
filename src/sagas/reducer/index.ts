import loginReducer from "./login";
import recipeReducer from "./recipe";
import listRecipeReducer from "./recipeList";
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login: loginReducer,
  uniqueRecipe: recipeReducer,
  recipeList: listRecipeReducer,
};
