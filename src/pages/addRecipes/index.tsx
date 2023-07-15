// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, ChangeEventHandler } from 'react'
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
import useForm from '../../utils/useForm'
import { ReduxState } from '../../sagas/reducer/types'
let initialData: AddRecipeFormModel = {
  name: '',
  category: '',
  directions: '',
  publishDate: '',
  ingredient: [],
}

const AddRecipes = () => {
  const { search } = useLocation()
  const history = useNavigate()
  const [loading, setLoading] = useState(false)
  const [ingredients, setIngredients] = useState<string[]>([])
  const [tempIngredient, setTempIngredient] = useState('')
  const [isUpdate, setIsUpdate] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | undefined>('')
  const dispatch = useDispatch()
  const uniqueRecipeResponse = useSelector(
    (state: ReduxState) => state.uniqueRecipe.recipe
  )
  const id = search.slice(4)
  const getUniqueRecipe = () => {
    if (uniqueRecipeResponse) {
      const { category, directions, ingredient, name, publishDate } =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (uniqueRecipeResponse as any).data()
      initialData = {
        name,
        category,
        directions,
        publishDate,
      }
      setIngredients(ingredient)
      setValues(initialData)
    }
  }

  useEffect(() => {
    return () => {
      dispatch(clearRecipe())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (search) {
      dispatch(fetchRecipe(id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])
  useEffect(() => {
    if (uniqueRecipeResponse) {
      getUniqueRecipe()
      setIsUpdate(true)
    } else {
      setValues({
        name: '',
        category: '',
        directions: '',
        publishDate: '',
        ingredient: [],
      })
      setIngredients([])
      setTempIngredient('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, uniqueRecipeResponse])

  const create = async () => {
    const id = search.slice(4)
    setLoading(true)
    const finalData = {
      ...values,
      ingredient: ingredients,
      publishDate: values.publishDate,
      isPublished: new Date(values.publishDate) > new Date() ? false : true,
      imageUrl: imageUrl,
    }
    if (!isUpdate) {
      dispatch(createRecipe(finalData))
    } else {
      dispatch(updateRecipe(id, finalData))
    }
    setLoading(false)
    setIngredients([])
    setTempIngredient('')
    history('/view')
  }

  const [values, handleChange, submit, setValues] = useForm(initialData, create)

  const addIngredients = () => {
    setIngredients((prev) => [...prev, tempIngredient])
    setTempIngredient('')
  }

  const tempIngredientHandling = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempIngredient(e.target.value)
  }
  const deleteIngredients = (ingredient: string) => {
    const temp = [...ingredients]
    setIngredients(temp.filter((value) => value !== ingredient))
  }
  const handleCancel = () => {
    history('/view')
  }
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
    )
  }

  return (
    <div className="recipe-container">
      <div className="recipe-box">
        <div className="recipe-head">Create Recipe</div>
        <form onSubmit={submit}>
          <div>
            <label>Recipe Name :</label>
            <input
              type={'text'}
              onChange={handleChange}
              name="name"
              value={values.name}
              required
            />
          </div>
          <div>
            <label>Category :</label>
            <input
              type={'text'}
              name="category"
              onChange={handleChange}
              value={values.category}
              required
            />
          </div>
          <div>
            <label>Directions :</label>
            <textarea
              name="directions"
              onChange={
                handleChange as unknown as ChangeEventHandler<HTMLTextAreaElement>
              }
              value={values.directions}
              required
            />
          </div>
          <div>
            <label>Publish Date :</label>
            <input
              type={'date'}
              name="publishDate"
              onChange={handleChange}
              value={values.publishDate}
              required
            />
          </div>
          <FileUploadComponent
            basePath={'recipes'}
            existingUrl={imageUrl as string}
            handleUploadFinish={(newUrl) => setImageUrl(newUrl)}
            handleUploadCancel={() => setImageUrl('')}
          />
          <div>
            <label>Ingredient :</label>
            <input
              type={'text'}
              name="ingredient"
              onChange={tempIngredientHandling}
              value={tempIngredient}
            />
            <button type="button" onClick={addIngredients}>
              ADD
            </button>
          </div>
          <div>{<IngredientTable />}</div>
          {search ? (
            <div>
              <button type="submit">Update</button>
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          ) : (
            <button type="submit">Submit</button>
          )}
          {loading && <div style={{ color: 'red' }}>Updating</div>}
        </form>
      </div>
    </div>
  )
}

export default AddRecipes
