import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Review {
  id: string;
  rating: number;
  text: string;
}

const initialState: Record<string, Review> = {};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setReview: (state, action: PayloadAction<Review>) => {
      state[action.payload.id] = action.payload;
    },
  },
});

export const { setReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;