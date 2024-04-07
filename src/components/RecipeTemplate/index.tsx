/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import './styles.css'
import { useNavigate } from 'react-router-dom'
import { RecipeTemplateProps } from './types'
import { Box, Stack, Typography } from '@mui/material'
import recipeDefault from '../../assets/recipeDefault.webp'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import DeleteIcon from '@mui/icons-material/Delete'

const RecipeTemplate = ({ recipe, handleDelete }: RecipeTemplateProps) => {
  const history = useNavigate()
  return (
    <Box sx={{ maxWidth: '25rem', minWidth: '19rem' }}>
      <Stack onClick={() => history(`/recipe?id=${recipe.id}`)}>
        <img
          src={recipe.imageUrl.length > 1 ? recipe.imageUrl : recipeDefault}
          className="image"
        />
      </Stack>
      <Stack className="recipe-template" key={recipe.id}>
        <Stack className="recipe-template__details" rowGap={1}>
          <Typography classes={{ root: 'recipe-template__heading' }}>
            {recipe.name}
          </Typography>
          <Typography
            classes={{ root: 'recipe-template__category' }}
            sx={{
              fontSize: '1rem',
              color: '#909090',
              fontWeight: 'bolder',
            }}
          >
            {recipe.category}
          </Typography>
          {/* <div>
          <label>Ingredient:</label>
          {recipe.ingredient.map((content, index) => (
            <div key={index} className="ingredient">
              {content}
            </div>
          ))}
        </div> */}
          <div>
            <div className="instruction">{recipe.directions}</div>
          </div>

          <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
            <ModeEditIcon onClick={() => history(`/create?id=${recipe.id}`)} />
            <DeleteIcon onClick={() => handleDelete(recipe.id)} />
          </Box>
        </Stack>
      </Stack>
    </Box>
  )
}

export default RecipeTemplate
