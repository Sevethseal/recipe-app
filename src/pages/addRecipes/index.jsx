import React, { useState, useEffect } from "react";
import "./styles.css";
import useForm from "../../utils/useForm";
import firebaseFirestoreService from "../../FireBaseFirestoreService";
import { useLocation } from "react-router-dom";
let initialData = {
  name: "",
  category: "",
  directions: "",
  publishDate: "",
  ingredient: [],
};

const AddRecipes = () => {
  const { search } = useLocation();
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [tempIngredient, setTempIngredient] = useState("");
  useEffect(() => {
    if (search) {
      getUniqueRecipe();
    }
  }, []);

  const create = async () => {
    setLoading(true);
    const finalData = {
      ...values,
      ingredient: ingredients,
      publishDate: values.publishDate,
      isPublished: new Date(values.publishDate) > new Date() ? false : true,
    };
    try {
      await firebaseFirestoreService.createDocument("recipes", finalData);
    } catch (error) {
      alert(error);
    }
    setLoading(false);
    setIngredients([]);
    setTempIngredient("");
  };
  const getUniqueRecipe = async () => {
    const id = search.slice(4);
    try {
      const response = await firebaseFirestoreService.readUniqueDocument(
        "recipes",
        id
      );
      console.log(response.data(), "response");

      const { category, directions, ingredient, name, publishDate } =
        response.data();
      initialData = {
        name,
        category,
        directions,
        publishDate,
      };
      setIngredients(ingredient);
      setValues(initialData);
    } catch (error) {
      alert(error);
    }
  };
  const [values, handleChange, submit, setValues] = useForm(
    initialData,
    create
  );

  const addIngredients = () => {
    setIngredients((prev) => [...prev, tempIngredient]);
    setTempIngredient("");
  };

  const tempIngredientHandling = (e) => {
    setTempIngredient(e.target.value);
  };
  const deleteIngredients = (ingredient) => {
    const temp = [...ingredients];
    setIngredients(temp.filter((value) => value !== ingredient));
  };
  console.log(search.slice(4), "jjjj");
  const IngredientTable = () => {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ingredient, index) => (
              <tr key={index}>
                <td>{ingredient}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => deleteIngredients(ingredient)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="recipe-container">
      <div className="recipe-box">
        <div className="recipe-head">Create Recipe</div>
        <form onSubmit={submit}>
          <div>
            <label>Recipe Name :</label>
            <input
              type={"text"}
              onChange={handleChange}
              name="name"
              value={values.name}
              required
            />
          </div>
          <div>
            <label>Category :</label>
            <input
              type={"text"}
              name="category"
              onChange={handleChange}
              value={values.category}
              required
            />
          </div>
          <div>
            <label>Directions :</label>
            <textarea
              type={"text"}
              name="directions"
              onChange={handleChange}
              value={values.directions}
              required
            />
          </div>
          <div>
            <label>Publish Date :</label>
            <input
              type={"date"}
              name="publishDate"
              onChange={handleChange}
              value={values.publishDate}
              required
            />
          </div>
          {<IngredientTable />}
          <div>
            <label>Ingredient :</label>
            <input
              type={"text"}
              name="ingredient"
              onChange={tempIngredientHandling}
              value={tempIngredient}
            />
            <button type="button" onClick={addIngredients}>
              ADD
            </button>
          </div>
          {search ? (
            <div>
              <button>Update</button>
              <button>Cancel</button>
            </div>
          ) : (
            <button type="submit">Submit</button>
          )}
          {loading && <div style={{ color: "red" }}>Updating</div>}
        </form>
      </div>
    </div>
  );
};

export default AddRecipes;
