interface RecipeData {
  category: string
  directions: string
  ingredient: string[]
  name: string
  publishDate: string
  imageUrl: string
}

export interface UniqueRecipeResponse {
  data: () => RecipeData
}
