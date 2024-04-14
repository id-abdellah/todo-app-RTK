/* eslint-disable no-unused-vars */
import { configureStore } from "@reduxjs/toolkit";
import todos from "./reducers/todos";

import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, todos);

export const store = configureStore({
    reducer: {
        todos: persistedReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export const persistor = persistStore(store)