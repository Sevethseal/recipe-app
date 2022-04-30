import React, { useEffect, useState } from "react";
import RecipeTemplate from "../../components/RecipeTemplate";
import firebaseFirestoreService from "../../FireBaseFirestoreService";
import "./styles.css";

const ViewRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
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
  const handleDelete = async (id) => {
    setIsDelete(true);
    try {
      await firebaseFirestoreService.deleteDocument("recipes", id);
    } catch (error) {
      alert(error);
    }
    setIsDelete(false);
  };
  const handleGetAllRecipe = async () => {
    const fetchedRecipes = await getAllRecipe();
    setRecipes(fetchedRecipes);
  };
  useEffect(() => {
    if (!isDelete) {
      handleGetAllRecipe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDelete]);

  return (
    <div>
      ViewRecipes
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
