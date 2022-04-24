import React, { useEffect, useState } from "react";
import RecipeTemplate from "../../components/RecipeTemplate";
import firebaseFirestoreService from "../../FireBaseFirestoreService";
import "./styles.css";

const ViewRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const getAllRecipe = async () => {
    let fetchedRecipes = [];
    try {
      const response = await firebaseFirestoreService.readDocument("recipes");
      const recipes = response.docs.map((docValues) => {
        const id = docValues.id;
        const data = docValues.data();
        return { ...data, id };
      });
      fetchedRecipes = [...recipes];
    } catch (error) {
      alert(error);
    }
    return fetchedRecipes;
  };
  const handleGetAllRecipe = async () => {
    const fetchedRecipes = await getAllRecipe();
    setRecipes(fetchedRecipes);
  };
  useEffect(() => {
    handleGetAllRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      ViewRecipes
      <div className="view-recipes">
        {recipes &&
          recipes.map((recipe, index) => (
            <RecipeTemplate recipe={recipe} key={index} />
          ))}
      </div>
    </div>
  );
};

export default ViewRecipes;
