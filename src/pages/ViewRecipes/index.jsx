import React, { useEffect, useState } from "react";
import RecipeTemplate from "../../components/RecipeTemplate";
import firebaseFirestoreService from "../../FireBaseFirestoreService";
import { AllCategory, sortBy } from "./view";
import "./styles.css";

const ViewRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [byCategory, setByCategory] = useState("All");
  const [sortByOptions, setSortBy] = useState("Default");
  const getAllRecipeQueries = async () => {
    let fetchedRecipes = [];
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

    try {
      let response;
      if (byCategory !== "All") {
        response = await firebaseFirestoreService.readDocument(
          "recipes",
          [
            {
              field: "category",
              condition: "==",
              value: byCategory,
            },
          ],
          orderByField,
          sortOption
        );
      } else {
        response = await firebaseFirestoreService.readDocument(
          "recipes",
          [],
          orderByField,
          sortOption
        );
      }
      const recipes = response.docs.map((docValues) => {
        const id = docValues.id;
        const data = docValues.data();
        return { ...data, id };
      });
      fetchedRecipes = [...recipes];
    } catch (error) {}
    return fetchedRecipes;
  };

  const handleDelete = async (id) => {
    setIsDelete(true);
    try {
      await firebaseFirestoreService.deleteDocument("recipes", id);
    } catch (error) {
      alert(error);
    }
    setIsDelete(false);
  };
  const handleGetAllRecipeQueries = async () => {
    const fetchedRecipes = await getAllRecipeQueries();
    setRecipes(fetchedRecipes);
  };
  useEffect(() => {
    if (!isDelete) {
      if (byCategory === "All") {
        handleGetAllRecipeQueries();
      } else {
        handleGetAllRecipeQueries();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDelete, byCategory, sortByOptions]);
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
        {isDelete && <h2>Updating</h2>}
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
