import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserData = createAsyncThunk('/auth/fetchUserData',async ()=>{
    const {data} = await axios.post('')
})

const initialState ={
    data: null,
    status: 'loading'
}

const authSlice = createSlice({
name: 'auth',
initialState,
extraReducers:{
    [fetchUserData.pending]: (state)=> {
    state.po

        }
    }
}
})