export const FETCH_RECIPE_LIST_ACTION = "FETCH_RECIPE_LIST_ACTION";
export const FETCH_RECIPE_LIST_ACTION_SUCCESS =
  "FETCH_RECIPE_LIST_ACTION_SUCCESS";
export const CLEAR_RECIPE_LIST_ACTION = "CLEAR_RECIPE_LIST_ACTION";

export const fetchRecipeList = (queries = [], field = "", order = "") => ({
  type: FETCH_RECIPE_LIST_ACTION,
  queries,
  field,
  order,
});

export const fetchRecipeListSuccess = (recipeListResponse) => ({
  type: FETCH_RECIPE_LIST_ACTION_SUCCESS,
  recipeListResponse,
});

const initialRecipeListState = {
  recipeListResponse: null,
};

const listRecipeReducer = (state = initialRecipeListState, action) => {
  switch (action.type) {
    case FETCH_RECIPE_LIST_ACTION_SUCCESS: {
      return {
        ...state,
        recipeListResponse: action.recipeListResponse,
      };
    }
    case CLEAR_RECIPE_LIST_ACTION: {
      return initialRecipeListState;
    }
    default:
      return state;
  }
};

export default listRecipeReducer;
