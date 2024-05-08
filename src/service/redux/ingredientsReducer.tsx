import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
// https://bluelight.co/blog/redux-toolkit-with-typescript
export interface IngredientsState {
  ingredient: string,
  ingredientsList: string[],
  cocktailsList: any[]
}

const initialState: IngredientsState = {
  ingredient: 'rum',
  ingredientsList: ['rum'],
  cocktailsList: []
}

export const fetchContent = createAsyncThunk(
  'content/fetchContent',
  async (payload: string) => {
    const res = await axios('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + payload)
    const data = await res.data
    return data
  }
)

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    // actions
    changeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredient = action.payload
    },
    changeIngredientsList: (state, action: PayloadAction<string[]>) => {
      state.ingredientsList = action.payload
    },
    changeCocktailsList: (state, action: PayloadAction<string[]>) => {
      state.cocktailsList = action.payload
    }
  }
})

export const getCocktailsListByIngredient = (payload: string) => (dispatch: any) => {
  axios.get("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + payload)
    .then((response) => {
      dispatch(changeIngredientsList(response.data.data));
    })
    .catch ((err: any) => {
      console.error("Error in data fetch:", err)
    })
};

export const { changeIngredient, changeIngredientsList, changeCocktailsList } = ingredientsSlice.actions

export default ingredientsSlice.reducer