import create from 'zustand';
// import useFetch from './useFetch';
import axios from "axios";

export const initialState = {
  loading: false,
  success: false,
  error: false,
  data: null,
  errorData: null,
};

type inDecrementStoreType = {
  countZ: number;
  incrementZ: () => void;
  decrementZ: () => void;
};

type getDataCocktailType = {
  dataCocktail: any;
  cocktailsList: any;
  setCocktail: (payload: string) => void;
  setCocktailList: (payload: any) => void;
  getCocktail: (payload: string) => void;
};

const inDecrementStore = create<inDecrementStoreType>((set: any) => ({
  countZ: 4,
  incrementZ: () => set((state: any) => ({ countZ: state.countZ + 1 })),
  decrementZ: () => set((state: any) => ({ countZ: state.countZ - 1 })),
}));

const getDataCocktailStore = create<getDataCocktailType>((set: any) => ({
  dataCocktail: 'mojito',
  cocktailsList: [],
  setCocktail: (payload: string) => set((state: any) => ({ ...state, dataCocktail: payload })),
  setCocktailList: (payload: any) => set((state: any) => ({ ...state, cocktails: payload })),
  getCocktail: async (payload: string) => {
    set({ ...initialState, loading: true });
    try {
      const res = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + payload)
      for (const d of res.data.drinks) {
        d.ingredientList = []
        for (let i: number = 1; i <= 15; i++) {
          if(d["strIngredient"+i]) {
            d.ingredientList.push(d["strIngredient"+i])
          }
        }
      }
      set({ ...initialState, success: true, data: res.data })
      if(res.data?.drinks && res.data?.drinks?.length > 0) {
        set({ cocktailsList: res.data?.drinks })
      }
    } catch (err) {
      console.error("Error in data fetch:", err);
      set({ ...initialState, error: true, errorData: err })
    }
  }
}));

/*const useGetData = create((set: any) => ({
  cocktails: [],
  ...initialState,
  execute: async () => {
    set({ ...initialState, loading: true });
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users")
      set({ ...initialState, success: true, data: res.data })
      set({ cocktails: res.data })
    } catch (err) {
      console.error("Error in data fetch:", err);
      set({ ...initialState, error: true, errorData: err })
    }
  },
}));*/


export {inDecrementStore, getDataCocktailStore};