import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const userApi = createApi({
    reducerPath:"userApi",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:5000"}),
    endpoints: (builder) => ({
        getUserPage: builder.query({
            query: (page) => `/api/admin/data/${page}`
        }),
        getUserLength : builder.query({
            query : () => `/api/admin/data/length`,
            
        })
    })
})

export const { useGetUserPageQuery , useGetUserLengthQuery } = userApi