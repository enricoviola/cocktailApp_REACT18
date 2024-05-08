import { configureStore } from '@reduxjs/toolkit'
import ingredientsReducer from './ingredientsReducer'
import { ingredientsAPI } from "./ingredientsAPI";

export const store = configureStore({
  reducer: {
    ingredient: ingredientsReducer,
    [ingredientsAPI.reducerPath]: ingredientsAPI.reducer,
  },
  // getDefaultMiddleware enables important feature like caching.
  middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(ingredientsAPI.middleware)
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch