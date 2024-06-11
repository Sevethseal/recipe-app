import React, { useEffect } from 'react'
import './styles.css'
import { Box, Stack, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearRecipe, fetchRecipe } from '../../sagas/reducer/recipe'
import { ReduxState } from '../../sagas/reducer/types'
import { UniqueRecipeResponse } from './types'

interface IngredientTableProps {
  ingredients: string[]
}
const ViewRecipe = () => {
  const { search } = useLocation()
  const dispatch = useDispatch()
  const id = search.slice(4)
  const uniqueRecipeResponse = useSelector(
    (state: ReduxState) => state.uniqueRecipe.recipe
  )

  const {
    category = '',
    directions = '',
    ingredient: ingredientList = [],
    name = '',
    publishDate = '',
  } = uniqueRecipeResponse
    ? (uniqueRecipeResponse as UniqueRecipeResponse)?.data()
    : {}

  useEffect(() => {
    if (search) {
      dispatch(fetchRecipe(id))
    }
    return () => {
      dispatch(clearRecipe())
    }
  }, [dispatch, id, search])

  const IngredientTable = ({ ingredients }: IngredientTableProps) => (
    <Box className="recipe__ingredients-wrapper">
      <Stack rowGap={2}>
        <Typography className="view-recipe__ingredients-heading">
          Ingredients
        </Typography>
        <Box className="view-recipe__ingredients">
          {ingredients.map((ingredient, index) => (
            <Stack
              component={'span'}
              className={
                index === ingredients.length - 1
                  ? 'view-recipe__ingredients-box-last'
                  : 'view-recipe__ingredients-box'
              }
              key={index}
            >
              {ingredient}
            </Stack>
          ))}
        </Box>
      </Stack>
    </Box>
  )

  return (
    <div className="view-recipe">
      <Box className="view-recipe__box">
        <Stack display={'flex'} alignItems={'center'} rowGap={2} width={'100%'}>
          <Typography className="view-recipe__text">{name}</Typography>
          <Typography className="view-recipe__sub-heading">
            {category}
          </Typography>

          <Box className="view-recipe__details-section">
            <Stack component={'div'}>
              <IngredientTable ingredients={ingredientList} />
            </Stack>
            <Stack>
              <Stack
                component={'div'}
                width={'100%'}
                sx={{ paddingLeft: '1.75rem' }}
              >
                <Typography className="view-recipe__date">
                  {publishDate}
                </Typography>
              </Stack>

              <Typography className="view-recipe__direction">
                {directions}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </div>
  )
}

export default ViewRecipe
