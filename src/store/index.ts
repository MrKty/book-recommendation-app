import { configureStore } from '@reduxjs/toolkit';
import reviewsReducer from './reviewsSlice';
import searchReducer from './searchSlice';


export const store = configureStore({
  reducer: {
    reviews: reviewsReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;