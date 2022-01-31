import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    value: localStorage.getItem("DARK_MODE") ?? "dark"
  },
  reducers: {
    switchTheme: (state) => {
      console.log(state.value);
      if (state.value === "dark") state.value = "light";
      else state.value = "dark";
    }
  }
});

// Action creators are generated for each case reducer function
export const { switchTheme } = themeSlice.actions;

export default themeSlice.reducer;
