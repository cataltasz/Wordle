import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    value: localStorage.getItem("auth") ?? ""
  },
  reducers: {
    changeAuth: (state, newAuth) => {
      state.value = newAuth.payload;
      console.log("new ", newAuth.payload);
    }
  }
});

// Action creators are generated for each case reducer function
export const { changeAuth } = authSlice.actions;

export default authSlice.reducer;
