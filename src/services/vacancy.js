"use client"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const vacancyApi = createApi({
    reducerPath: "vacancyApi",
    refetchOnFocus: true,
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/",
    }),
    tagTypes: ["Vacancy", "Category", "Company"],
    endpoints: (builder) => ({
        getVacancies: builder.query({
            query: (params) => {
                const query = new URLSearchParams(params).toString();
                return `vacancy?${query}`;
            },
            providesTags: ["Vacancy"]
        }),
        getVacanciesBySlug: builder.query({
            query: (slug) => `vacancy/${slug}`,
            providesTags: (result, error, slug) => [{type: "Vacancy", id: slug}]
        }),
        addVacancyView: builder.mutation({
            query: (slug) => ({
                url: `vacancy/${slug}`,
                method: 'PATCH',
            }),
            invalidatesTags: (result, error, slug) =>  [{ type: "Vacancy", id: slug }, "Vacancy"]
        }),
        deleteVacancy: builder.mutation({
            query: (slug) => ({
                url: `vacancy/${slug}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Vacancy", "Category", "Company"]
        }),
        addVacancy: builder.mutation({
            query: (body) => ({
                url: "vacancy",
                method: "POST",
                body
            }),
            invalidatesTags: ["Vacancy", "Category", "Company"]
        }),
        getCategories: builder.query({
            query: () => "category",
            providesTags: ["Category"]
        }),
        addCategory: builder.mutation({
            query: (body) => ({
                url: "category",
                method: "POST",
                body
            }),
            invalidatesTags: ["Category"]
        }),
        deleteCategory: builder.mutation({
            query: (slug) => ({
                url: `category/${slug}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Category"]
        }),
        getCompanies: builder.query({
            query: () => ({
                url: "company"
            }),
            providesTags: ["Company"]
        }),
        addCompany: builder.mutation({
            query: (body) => ({
                url: "company",
                method: "POST",
                body
            }) 
        }),
        deleteCompany: builder.mutation({
            query: (slug) => ({
                url: `company/${slug}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Company"]
        }),
        getCompaniesBySlug: builder.query({
            query: (slug) => ({
                url: `company/${slug}`
            })
        })
    })
});

export const { useGetVacanciesQuery, useGetVacanciesBySlugQuery, useAddVacancyViewMutation, useDeleteVacancyMutation, useAddVacancyMutation, useGetCategoriesQuery, useAddCategoryMutation, useDeleteCategoryMutation, useGetCompaniesQuery, useAddCompanyMutation, useDeleteCompanyMutation, useGetCompaniesBySlugQuery } = vacancyApi;