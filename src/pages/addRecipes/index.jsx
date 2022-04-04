import React from "react";
import "./styles.css";
import useForm from "../../utils/useForm";

const IngredientTable = () => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>salt</td>
            <td>
              <button>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const AddRecipes = () => {
  const create = () => {
    console.log(values);
  };
  const [values, handleChange, submit] = useForm(create);
  return (
    <div className="recipe-container">
      <div className="recipe-box">
        <div className="recipe-head">Create Recipe</div>
        <form onSubmit={submit}>
          <div>
            <label>Recipe Name :</label>
            <input type={"text"} onChange={handleChange} name="name" />
          </div>
          <div>
            <label>Category :</label>
            <input type={"text"} name="category" onChange={handleChange} />
          </div>
          <div>
            <label>Directions :</label>
            <textarea type={"text"} name="directions" onChange={handleChange} />
          </div>
          <div>
            <label>Publish Date :</label>
            <input type={"date"} name="publishDate" onChange={handleChange} />
          </div>
          {<IngredientTable />}
          <div>
            <label>Ingredient :</label>
            <input type={"text"} name="ingredient" onChange={handleChange} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipes;
