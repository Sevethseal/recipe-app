/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import './styles.css'
import { useNavigate } from 'react-router-dom'
import { RecipeTemplateProps } from './types'

const RecipeTemplate = ({ recipe, handleDelete }: RecipeTemplateProps) => {
  const history = useNavigate()
  return (
    <div className="recipe-template" key={recipe.id}>
      <div>
        <label>Recipe for:</label>
        <div>{recipe.name}</div>
      </div>
      <div>
        <label>Category:</label>
        <div>{recipe.category}</div>
      </div>
      <div>
        <label>Ingredient:</label>
        {recipe.ingredient.map((content, index) => (
          <div key={index} className="ingredient">
            {content}
          </div>
        ))}
      </div>
      <div>
        <label>Instruction:</label>
        <div className="instruction">{recipe.directions}</div>
      </div>
      <>
        {recipe.imageUrl && (
          <div>
            <img src={recipe.imageUrl} className="image" />
          </div>
        )}
      </>
      <div>
        <button onClick={() => history(`/create?id=${recipe.id}`)}>Edit</button>
        <button onClick={() => handleDelete(recipe.id)}>Delete</button>
      </div>
    </div>
  )
}

export default RecipeTemplate
