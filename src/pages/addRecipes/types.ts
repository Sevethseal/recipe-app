import { Dayjs } from 'dayjs'

export interface AddRecipeFormModel {
  name: string
  category: string
  directions: string
  publishDate: Dayjs | string
  ingredient: string
  ingredientList: string[]
}
