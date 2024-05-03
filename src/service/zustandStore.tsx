import create from 'zustand';
import useFetch from './useFetch';
import axios from "axios";

const initialState = {
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
  getData: () => void;
};

const inDecrementStore = create<inDecrementStoreType>((set: any) => ({
  countZ: 4,
  incrementZ: () => set((state: any) => ({ countZ: state.countZ + 1 })),
  decrementZ: () => set((state: any) => ({ countZ: state.countZ - 1 })),
}));

const getDataCocktailStore = create<getDataCocktailType>((set: any) => ({
  dataCocktail: null,
  getData: () => set(() => ({ dataCocktail: useFetch('s=negroni') })),
}));

const useGetData = create((set: any) => ({
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
}));


export {inDecrementStore, getDataCocktailStore, useGetData};