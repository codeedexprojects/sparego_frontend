import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL } from "../baseUrl"






export const getHomecards = createAsyncThunk(
    "cards/getHomecards",
    async(_,{rejectWithValue})=>{
try{
    const response = await axios.get(`${BASE_URL}/home-card`,)
    return response?.data 
}catch(error){
    return rejectWithValue(error.response?.data || "failed to get the random products")
}
    }
)

const homeCardSlice = createSlice({
    name:"homecards",
    initialState:{
        cards:[],
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
         .addCase(getHomecards.pending,(state)=>{
                    state.loading=true;
                    state.error=null;
                })
                .addCase(getHomecards.fulfilled,(state,action)=>{
                    state.loading=false;
                    state.cards =action.payload.cards;
                })
                .addCase(getHomecards.rejected,(state, action)=>{
                    state.loading=false;
                    state.error=action.payload;
                })
    }
})

export default homeCardSlice.reducer