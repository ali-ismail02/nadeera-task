import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
    userProfile?: {
        token?: string,
        type?: number,
        id?: number;
        image?: string;
        name?: string;
        email?: string;
        phone?: string;
        theme?: string;
    } | null;
}

const initialState: User = {
  userProfile: null
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action) {
        return action.payload;
    },
    deleteUser() {
        AsyncStorage.removeItem('userProfile');
        return initialState;
    },
    updateUserProfile(state, action){
        state.userProfile = action.payload.userProfile;
        AsyncStorage.setItem('userProfile', JSON.stringify(action.payload.userProfile));
    },
  },
});

export const { addUser, deleteUser, updateUserProfile} = userSlice.actions
export default userSlice.reducer
