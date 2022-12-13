export interface RecipeRawType {
  id: number;
  name: string;
  createdAt: Date;
  creatorName: string;
  cookingTime: number;
  ingredients: Array<string>;
  instructions: Array<string>;
}

export interface RecipeType extends RecipeRawType {
  favorite: boolean;
}

export interface StoreType {
  recipes: Array<RecipeType>;
}
export interface StoreValue {
  recipeReducer: StoreType;
}
