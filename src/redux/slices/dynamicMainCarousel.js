

export const getHomeCarousel = createAsyncThunk(
    "carousel/getHomeCarousel",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/main-carousel/`,
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch carousel"
            )
        }
    }
)