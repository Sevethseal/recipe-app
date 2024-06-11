import React, { useState, useEffect, useCallback } from 'react'
import './styles.css'

import { useLocation, useNavigate } from 'react-router-dom'
import FileUploadComponent from '../../components/FileUploadComponent'
import {
  fetchRecipe,
  createRecipe,
  updateRecipe,
  clearRecipe,
} from '../../sagas/reducer/recipe'
import { useDispatch, useSelector } from 'react-redux'
import { AddRecipeFormModel } from './types'
import { ReduxState } from '../../sagas/reducer/types'
import { Box, Button, CircularProgress, Stack, TextField } from '@mui/material'
import { TextareaAutosize } from '@mui/base'
import { DatePicker } from '@mui/x-date-pickers'
import styled from '@mui/styles/styled/styled'
import { useForm, Controller, SubmitHandler, Resolver } from 'react-hook-form'
import dayjs from 'dayjs'
import ConfirmationModal from '../../components/ConfirmationModal'

const defaultValue: AddRecipeFormModel = {
  name: '',
  category: '',
  directions: '',
  publishDate: dayjs(new Date()),
  ingredient: '',
  ingredientList: [],
}
const WhiteTextField = styled(TextField)({
  background: 'transparent',
  width: '100%',
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
})
const formValidation: Resolver<AddRecipeFormModel> = async (values) => {
  return {
    values,
    errors: values.ingredientList.length
      ? {}
      : {
          ingredient: {
            type: 'required',
            message: 'This is required.',
          },
        },
  }
}
const AddRecipes = () => {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddRecipeFormModel>({
    defaultValues: defaultValue,
    resolver: formValidation,
  })
  const [ingredientList] = watch(['ingredientList'])
  const { search } = useLocation()
  const history = useNavigate()
  const [loading, setLoading] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | undefined>('')
  const [isErrorModalOpen, setIsErrorsModalOpen] = useState(false)
  const dispatch = useDispatch()
  const uniqueRecipeResponse = useSelector(
    (state: ReduxState) => state.uniqueRecipe.recipe
  )

  const isLoading = useSelector((state: ReduxState) => state.login.isLoading)
  const id = search.slice(4)

  const getUniqueRecipe = useCallback(() => {
    if (uniqueRecipeResponse && search) {
      const { category, directions, ingredient, name, publishDate, imageUrl } =
        uniqueRecipeResponse.data()
      const preFillFormData = {
        ...defaultValue,
        name,
        category,
        directions,
        publishDate: dayjs(publishDate),
        ingredientList: ingredient,
      }
      setImageUrl(imageUrl)
      reset(preFillFormData)
    }
  }, [uniqueRecipeResponse, search, setImageUrl, reset])
  const errorModalCloseAction = () => {
    setIsErrorsModalOpen(false)
  }

  useEffect(() => {
    return () => {
      dispatch(clearRecipe())
    }
  }, [dispatch])
  useEffect(() => {
    if (search) {
      dispatch(fetchRecipe(id))
    }
  }, [dispatch, id, search])
  useEffect(() => {
    if (uniqueRecipeResponse) {
      getUniqueRecipe()
      setIsUpdate(true)
    }
  }, [getUniqueRecipe, search, uniqueRecipeResponse])

  useEffect(() => {
    if (Object.keys(errors).length) {
      setIsErrorsModalOpen(true)
    }
  }, [errors])

  const addIngredients = () => {
    const [ingredientList, ingredient] = getValues([
      'ingredientList',
      'ingredient',
    ])
    if (ingredient) {
      setValue('ingredientList', [ingredient, ...ingredientList])

      setValue('ingredient', '')
    }
  }

  const deleteIngredients = (ingredient: string) => {
    const ingredientList = getValues('ingredientList')
    const temp = [...ingredientList]
    setValue(
      'ingredientList',
      temp.filter((value) => value !== ingredient)
    )
  }
  const handleCancel = () => {
    history('/view')
  }
  const IngredientTable = () => {
    return (
      <div>
        <table>
          <thead>
            <tr className="ingredient-table">
              <th>Ingredient</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ingredientList.map((ingredient, index) => (
              <tr key={index}>
                <td className="ingredient-table-text">{ingredient}</td>
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
    )
  }
  const onSubmit: SubmitHandler<AddRecipeFormModel> = (data) => {
    const id = search.slice(4)
    setLoading(true)

    let finalData
    if (data.publishDate) {
      const { name, category, directions, publishDate, ingredientList } = data
      finalData = {
        name,
        category,
        directions,
        isPublished:
          new Date(publishDate as string).toLocaleDateString() >
          new Date().toLocaleDateString()
            ? false
            : true,
        publishDate: new Date(publishDate as string).toLocaleDateString(),
        imageUrl,
        ingredient: ingredientList,
      }
    } else {
      finalData = {
        ...data,
      }
    }

    if (!isUpdate) {
      dispatch(createRecipe(finalData))
    } else {
      dispatch(updateRecipe(id, finalData))
    }
    setLoading(false)
    history('/view')
  }

  return (
    <div className="recipe-container">
      {isLoading ? (
        <CircularProgress color="secondary" size={'7rem'} />
      ) : (
        <>
          <Box className="content-wrapper">
            <Box className="ingredient-box">
              <div>{<IngredientTable />}</div>
            </Box>
            <Box className="recipe-box">
              <div className="recipe-head">Create Recipe</div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack rowGap={2}>
                  <Box display={'flex'} columnGap={2}>
                    <Controller
                      name="name"
                      control={control}
                      rules={{ required: 'Recipe name is required !' }}
                      render={({ field }) => (
                        <WhiteTextField
                          id="name"
                          label="Recipe Name"
                          variant="outlined"
                          autoComplete="off"
                          error={Boolean(errors.name?.message)}
                          {...field}
                        />
                      )}
                    />
                    <Controller
                      name="category"
                      control={control}
                      rules={{ required: 'Category name is required !' }}
                      render={({ field }) => (
                        <WhiteTextField
                          id="Category"
                          label="Category"
                          variant="outlined"
                          autoComplete="off"
                          error={Boolean(errors.category?.message)}
                          {...field}
                        />
                      )}
                    />
                  </Box>
                  <Controller
                    name="directions"
                    control={control}
                    rules={{ required: 'Directions are required !' }}
                    render={({ field }) => (
                      <TextareaAutosize
                        id="directions"
                        placeholder="Directions"
                        minRows={9}
                        style={{
                          color: 'white',
                          background: 'transparent',
                          border: '2px solid white',
                          borderRadius: '5px',
                          width: 'auto',
                        }}
                        {...field}
                      />
                    )}
                  />
                  <Controller
                    name="publishDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        label="Publish Date"
                        sx={{
                          ':placeholder': {
                            color: 'white',
                          },
                          svg: {
                            color: 'white',
                          },
                          '&.MuiPickersPopper-root': {
                            color: 'white',
                          },
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
                        {...field}
                      />
                    )}
                  />
                  <Controller
                    name="ingredient"
                    control={control}
                    render={({ field }) => (
                      <WhiteTextField
                        id="ingredient"
                        label="Ingredient"
                        variant="outlined"
                        error={Boolean(errors.ingredient?.message)}
                        {...field}
                      />
                    )}
                  />

                  <Button
                    variant="outlined"
                    onClick={addIngredients}
                    style={{
                      border: '1px solid white',
                      color: 'white',
                      font: 'Prata',
                    }}
                  >
                    ADD
                  </Button>
                  <FileUploadComponent
                    basePath={'recipes'}
                    existingUrl={imageUrl as string}
                    handleUploadFinish={(newUrl) => setImageUrl(newUrl)}
                    handleUploadCancel={() => setImageUrl('')}
                  />
                  {search ? (
                    <Box display={'flex'} columnGap={2}>
                      <Button
                        type="submit"
                        variant="outlined"
                        style={{
                          border: '1px solid white',
                          color: 'white',
                          font: 'Prata',
                          width: '100%',
                        }}
                      >
                        Update
                      </Button>
                      <Button
                        type="button"
                        onClick={handleCancel}
                        variant="outlined"
                        style={{
                          border: '1px solid white',
                          color: 'white',
                          font: 'Prata',
                          width: '100%',
                        }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  ) : (
                    <Button
                      type="submit"
                      variant="outlined"
                      style={{
                        border: '1px solid white',
                        color: 'white',
                        font: 'Prata',
                        width: '100%',
                      }}
                    >
                      Submit
                    </Button>
                  )}
                </Stack>

                {loading && <div style={{ color: 'red' }}>Updating</div>}
                {
                  <ConfirmationModal
                    title="OOPS errors"
                    content="Please check the red highlighted box"
                    onClose={errorModalCloseAction}
                    open={isErrorModalOpen}
                    key={'DeleteModal'}
                    showOkButtonOnly={true}
                  />
                }
              </form>
            </Box>
          </Box>
        </>
      )}
    </div>
  )
}

export default AddRecipes
