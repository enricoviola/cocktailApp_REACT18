import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ingredientsAPI: any = createApi({
    reducerPath: "ingredientsAPI",
    baseQuery: fetchBaseQuery({baseUrl: "https://www.thecocktaildb.com/api/json/v1/1/filter.php"}),
    endpoints: (builder) => ({
        getCocktails: builder.query({
            query: (ingredient: string) => `?i=${ingredient}`
        }),
    })
});

// Export endpoints as hooks
export const { useGetCocktailsQuery } = ingredientsAPI;