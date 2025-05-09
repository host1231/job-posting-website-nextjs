"use client"
import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { vacancyApi } from "@/services/vacancy"

export const store = configureStore({
    reducer: {
        [vacancyApi.reducerPath]: vacancyApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(vacancyApi.middleware)
});

setupListeners(store.dispatch);