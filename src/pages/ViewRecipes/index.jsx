import React, { useEffect, useState } from "react";
import RecipeTemplate from "../../components/RecipeTemplate";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecipe } from "../../sagas/reducer/recipe";
import { fetchRecipeList } from "../../sagas/reducer/recipeList";
import { AllCategory, sortBy } from "./view";
import "./styles.css";

const ViewRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [byCategory, setByCategory] = useState("All");
  const [sortByOptions, setSortBy] = useState("Default");
  const dispatch = useDispatch();
  const recipeListResponse = useSelector(
    (state) => state.recipeList.recipeListResponse
  );

  const getAllRecipeQueries = () => {
    let sortOption = "";
    const orderByField = "publishDate";
    switch (sortByOptions) {
      case "Newest-oldest": {
        sortOption = "desc";
        break;
      }
      case "Oldest-Newest": {
        sortOption = "asc";
        break;
      }
      default: {
        break;
      }
    }

    if (byCategory !== "All") {
      dispatch(
        fetchRecipeList(
          [
            {
              field: "category",
              condition: "==",
              value: byCategory,
            },
          ],
          orderByField,
          sortOption
        )
      );
    } else {
      dispatch(fetchRecipeList([], orderByField, sortOption));
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteRecipe(id));
    getAllRecipeQueries();
  };

  useEffect(() => {
    if (byCategory === "All") {
      getAllRecipeQueries();
    } else {
      getAllRecipeQueries();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [byCategory, sortByOptions]);
  useEffect(() => {
    if (recipeListResponse) {
      const recipes = recipeListResponse.docs.map((docValues) => {
        const id = docValues.id;
        const data = docValues.data();
        return { ...data, id };
      });
      setRecipes([...recipes]);
    }
  }, [recipeListResponse]);
  return (
    <div>
      <div>
        <div className="sort">
          <div>
            <label>By Category :</label>
            <select
              value={byCategory}
              onChange={(e) => setByCategory(e.target.value)}
            >
              {AllCategory.map((category, index) => (
                <option key={index}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Sort By :</label>
            <select
              value={sortByOptions}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortBy.map((option, index) => (
                <option key={index}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="view-recipes">
        {recipes &&
          recipes.map((recipe, index) => (
            <RecipeTemplate
              recipe={recipe}
              key={index}
              handleDelete={handleDelete}
            />
          ))}
      </div>
    </div>
  );
};

export default ViewRecipes;
