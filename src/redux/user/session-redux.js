import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {},
  isLogged: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loginUser: (state, action) => ({
      ...state,
      data: action.payload,
      isLogged: true,
    }),
    logoutUser: (state) => ({
      ...state,
      isLogged: false,
    }),
    signUpUser: (state, action) => ({
      ...state,
      data: action.payload,
      isLogged: true,
    }),
  },
});

export const { loginUser, logoutUser, signUpUser } = usersSlice.actions;
export default usersSlice.reducer;