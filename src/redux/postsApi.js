import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (build) => ({
    getAllPosts: build.query({
      query: () => "posts",
    }),
    getPosts: build.query({
      query: (optionst) =>
        `posts?_page=${optionst.page}&_limit=${optionst.limit}`,
    }),
  }),
});

export const { useGetPostsQuery, useGetAllPostsQuery } = postsApi;
