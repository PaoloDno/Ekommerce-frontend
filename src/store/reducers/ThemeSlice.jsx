import { createSlice } from '@reduxjs/toolkit'
const themes = ['default', 'coffee', 'dark', 'sakura', 'dark2', `forest`];
const initialState = {
  currentTheme: 'default',
  userTheme: 'default',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    nextTheme: (state) => {
      const currentIndex = themes.indexOf(state.currentTheme);
      state.currentTheme = themes[(currentIndex + 1) % themes.length];
    },
    setTheme: (state, action) => {
      console.log("themes: ", action.payload);
      if (themes.includes(action.payload)) {
        state.currentTheme = action.payload;
      }
    },
  },
});

export const { nextTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;