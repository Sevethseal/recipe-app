import React, { useState } from 'react'
import './styles.css'
import { useNavigate } from 'react-router-dom'
import { RecipeTemplateProps } from './types'
import { Box, Stack, Typography } from '@mui/material'
import recipeDefault from '../../assets/recipeDefault.webp'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import DeleteIcon from '@mui/icons-material/Delete'
import ConfirmationModal from '../ConfirmationModal'

const RecipeTemplate = ({ recipe, handleDelete }: RecipeTemplateProps) => {
  const history = useNavigate()
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const handleDeleteModal = () => {
    setDeleteModalOpen((state) => !state)
  }
  const DeleteModalOkAction = () => {
    handleDelete(recipe.id)
    handleDeleteModal()
  }

  return (
    <Box sx={{ maxWidth: '25rem', minWidth: '19rem' }}>
      <Stack onClick={() => history(`/recipe?id=${recipe.id}`)}>
        <img
          src={recipe.imageUrl.length > 1 ? recipe.imageUrl : recipeDefault}
          className="image"
          alt="foodImage"
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
            <ModeEditIcon
              onClick={() => history(`/create?id=${recipe.id}`)}
              id="recipeEditIcon"
            />
            <DeleteIcon onClick={handleDeleteModal} id="recipeDeleteIcon" />
          </Box>
        </Stack>
      </Stack>
      <ConfirmationModal
        title="Delete Confirmation"
        content="Are you sure you want to delete the recipe"
        onClose={handleDeleteModal}
        onConfirm={DeleteModalOkAction}
        open={isDeleteModalOpen}
        key={'DeleteModal'}
      />
    </Box>
  )
}

export default RecipeTemplate
