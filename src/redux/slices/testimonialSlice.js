import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../baseUrl";
import axios from "axios";


export const getTestimonials = createAsyncThunk(
    "tesimonial/getTestimonials",
    async(_,{rejectWithValue})=>{
        try{
const response = await axios.get(`${BASE_URL}/reviews`)
return response.data.reviews;
        }catch(error){
            return rejectWithValue(
                error.resposne?.data?.message || "Faile dto fetch testimonials"
            )
        }
    }
)

const testimonialSlice = createSlice({
    name :"testimonial",
    initialState:{
        testimonials:[],
        loading : false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getTestimonials.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getTestimonials.fulfilled,(state, action)=>{
            state.loading = false;
            state.testimonials = action.payload;
        })
        .addCase(getTestimonials.rejected,(state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })

    },

})

export default testimonialSlice.reducer;