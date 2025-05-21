import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: '',
  reducers: {
    setSearchQuery: (state, action) => action.payload,
    resetSearch: () => '',
  },
});

export const { setSearchQuery, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;