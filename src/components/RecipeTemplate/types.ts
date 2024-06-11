export interface Recipe {
  name: string
  category: string
  ingredient: string[]
  imageUrl: string
  directions: string
  id: string
  publishDate: Date
}

export interface RecipeTemplateProps {
  recipe: Recipe
  handleDelete: (id: string) => void
}
