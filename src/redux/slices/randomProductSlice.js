import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";


export const getRandomProducts = createAsyncThunk(
    "randomproducts/getRandomProducts",
    async(_,{rejectWithValue})=>{
try{
    const response = await axios.get(`${BASE_URL}/products/random`,)
    return response?.data 
}catch(error){
    return rejectWithValue(error.response?.data || "failed to get the random products")
}
    }
)


const randomProductSlice = createSlice({
    name:"randomproduct",
    initialState:{
        randomProducts:[],
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getRandomProducts.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getRandomProducts.fulfilled,(state,action)=>{
            state.loading=false;
            state.randomProducts =action.payload;
        })
        .addCase(getRandomProducts.rejected,(state, action)=>{
            state.loading=false;
            state.error=action.payload;
        })
    }

}) 

export default randomProductSlice.reducer