import {configureStore} from '@reduxjs/toolkit';
import pokemon from './slices/pokemon';

export const store = configureStore({
  reducer: pokemon,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export default store;
