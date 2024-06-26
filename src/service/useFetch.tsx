import { useEffect, useState } from 'react'
import axios from 'axios'
const KEY_youTube = "AIzaSyAL9jCDWvRD2G5nUgBrLEgEhZTQsRvzt80"; // generic test KEY_youTube found online
export const baseParams_youTube = {
  part: "snippet",
  maxResults: 5,
  key: KEY_youTube
};

const searchUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?"
const singleUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?"

const useFetch = (query: string, type: string = 'searchUrl') => {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const [count, setCount] = useState(0)
    const [isError, setIsError] = useState(false)
    const url = type == 'searchUrl' ? searchUrl : singleUrl
    
    useEffect(() => {
        // A JavaScript IIFE (Immediately Invoked Function Expression) una funzione che viene invocata immediatamente dopo la sua definizione
        (async (query) => {
          setIsError(false)
          setIsLoading(true)
          try {
            const response = await axios.get(`${url}${query}`)
            for (const d of response.data.drinks) {
              d.ingredientList = []
              for (let i: number = 1; i <= 15; i++) {
                if(d["strIngredient"+i]) {
                  d.ingredientList.push(d["strIngredient"+i])
                }
              }
            }
            setData(response.data.drinks)
            setCount(response.data.drinks.length)
          } catch (err) {
            setIsError(true)
            setCount(0)
          }
          setIsLoading(false)
        }) (query)

    }, [query, url])

    return { isLoading, data, isError, count };
  };

  export const useFetch_youTube = axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3"
  });
  
  export default useFetch;