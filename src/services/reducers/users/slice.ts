import { createSlice } from '@reduxjs/toolkit';
import { USERS_STATE_NAME } from './constants';
import { fetchUsers } from './thunks';
import { ListOfModifiedUsers, UsersState } from './types';

const initialState: UsersState = {
  users: [], isLoaded: false, isLoading: false, error: undefined,
};

const usersSlice = createSlice({
  name: USERS_STATE_NAME, initialState, reducers: {
    resetUsersState: () => initialState, deleteUsersById: (state, action) => {
      const { value }: { value: Array<string> } = action.payload;

      const newUsersList: ListOfModifiedUsers = [...state.users].filter((user) => !value.includes(String(user.id)));

      state.users = newUsersList;
    }, addUser: (state, action) => {
      const { value } = action.payload;

      const newUsersList: ListOfModifiedUsers = [...state.users, value];

      state.users = newUsersList;
    },
  }, extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoaded = true;

        state.users = action.payload.map((user) => {
          return {
            zipcode: user.address.zipcode, ...user,
          };
        });
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoaded = true;
        state.error = action.payload;

        console.error('state.error:', state.error);
      });
  },
});

export const { resetUsersState, deleteUsersById, addUser } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
