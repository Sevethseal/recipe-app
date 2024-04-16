/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react'
import RecipeTemplate from '../../components/RecipeTemplate'
import { useDispatch, useSelector } from 'react-redux'
import { deleteRecipe } from '../../sagas/reducer/recipe'
import { fetchRecipeList } from '../../sagas/reducer/recipeList'
import { AllCategory, sortBy } from './view'
import './styles.css'
import { ReduxState } from '../../sagas/reducer/types'
import Carousel from 'react-spring-3d-carousel'
import {
  MenuItem,
  TextField,
  Stack,
  CircularProgress,
  Typography,
} from '@mui/material'

const ViewRecipes = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [recipes, setRecipes] = useState<any[]>([])
  const [byCategory, setByCategory] = useState('All')
  const [sortByOptions, setSortBy] = useState('Default')

  const dispatch = useDispatch()
  const recipeListResponse = useSelector(
    (state: ReduxState) => state.recipeList.recipeListResponse
  )
  const isLoading = useSelector((state: ReduxState) => state.login.isLoading)

  const getAllRecipeQueries = () => {
    let sortOption = ''
    const orderByField = 'publishDate'
    switch (sortByOptions) {
      case 'Newest-oldest': {
        sortOption = 'desc'
        break
      }
      case 'Oldest-Newest': {
        sortOption = 'asc'
        break
      }
      default: {
        break
      }
    }

    if (byCategory !== 'All') {
      dispatch(
        fetchRecipeList(
          [
            {
              field: 'category',
              condition: '==',
              value: byCategory,
            },
          ],
          orderByField,
          sortOption
        )
      )
    } else {
      dispatch(fetchRecipeList([], orderByField, sortOption))
    }
  }

  const handleDelete = (id: string) => {
    dispatch(deleteRecipe(id))
    getAllRecipeQueries()
  }

  useEffect(() => {
    if (byCategory === 'All') {
      getAllRecipeQueries()
    } else {
      getAllRecipeQueries()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [byCategory, sortByOptions])
  useEffect(() => {
    if (recipeListResponse) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const recipes = (recipeListResponse as any).docs.map((docValues: any) => {
        const id = docValues.id
        const data = docValues.data()
        return { ...data, id }
      })
      setRecipes([...recipes])
    }
  }, [recipeListResponse])

  const list =
    recipes &&
    recipes.map((recipe, index) => {
      return {
        key: index,
        content: (
          <RecipeTemplate
            recipe={recipe}
            key={index}
            handleDelete={handleDelete}
          />
        ),
      }
    })
  return (
    <div className="view-recipes">
      <div>
        <div className="sort">
          <div>
            <TextField
              value={byCategory}
              onChange={(e) => setByCategory(e.target.value)}
              select
              sx={{
                backgroundColor: 'transparent',
                minWidth: '10rem',
                '& label.Mui-focused': {
                  color: 'white',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: 'white',
                },
                '& .MuiInputLabel-root': {
                  color: 'white',
                },
                '& .MuiOutlinedInput-input': {
                  color: 'white',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                },
                '& .MuiOutlinedInput-root:hover': {
                  borderColor: 'white',
                },
              }}
              label="By Category"
              color="secondary"
              fullWidth
            >
              {AllCategory.map((category, index) => (
                <MenuItem
                  key={index}
                  value={category}
                  sx={{
                    backgroundColor: 'transparent',

                    '& .MuiSelect-select': {
                      padding: 2,
                      borderColor: 'white',
                      backgroundColor: 'transparent',
                      '& MuiMenu-paper': {
                        backgroundColor: 'transparent',
                      },
                    },
                  }}
                >
                  {category}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            <TextField
              value={sortByOptions}
              onChange={(e) => setSortBy(e.target.value)}
              label="By Time"
              sx={{
                backgroundColor: 'transparent',
                minWidth: '10rem',
                '& label.Mui-focused': {
                  color: 'white',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: 'white',
                },
                '& .MuiInputLabel-root': {
                  color: 'white',
                },
                '& .MuiOutlinedInput-input': {
                  color: 'white',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                },
                '& .MuiOutlinedInput-root:hover': {
                  borderColor: 'white',
                },
              }}
              select
            >
              {sortBy.map((option, index) => (
                <MenuItem
                  key={index}
                  value={option}
                  sx={{
                    borderBottom: 'white',
                  }}
                >
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>
      </div>

      <Stack
        sx={{
          width: '80%',
          height: '500px',
          margin: '10rem auto',
        }}
      >
        {isLoading ? (
          <Stack className="loading-icon">
            <CircularProgress color="secondary" size={'7rem'} />
          </Stack>
        ) : list.length > 0 ? (
          <Carousel slides={list} showNavigation={true} goToSlideDelay={100} />
        ) : (
          <Typography
            sx={{ color: 'white', fontSize: '3rem', textAlign: 'center' }}
          >
            Oops no recipe..!
          </Typography>
        )}
      </Stack>
    </div>
  )
}

export default ViewRecipes
