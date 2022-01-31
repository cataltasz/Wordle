import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/theme";
import authReducer from "../features/auth";

export default configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer
  }
});
