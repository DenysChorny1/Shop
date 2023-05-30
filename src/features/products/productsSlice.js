import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL } from "../../utils/constants"
import axios from 'axios'
import { shuffle } from "../../utils/common"

export const getProducts = createAsyncThunk('products/getProducts', 
    async (_, thunkAPI) => {
        try {
            const res = await axios(`${BASE_URL}/products`)
            return res.data
        } catch(err) {
            return thunkAPI.rejectWithValue(err)
        }
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        list: [],
        related: [],
        isLoading: false
    },
    reducers: {
        getRelatedProducts: (state, {payload}) => {
            const list = state.list.filter(({category: {id}}) => id === payload)
            state.related = shuffle(list)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.list = action.payload;
            state.isLoading = false
        })
        builder.addCase(getProducts.rejected, (state) => {
            state.isLoading = false
        })
    }
})

export const {getRelatedProducts} = productsSlice.actions

export default productsSlice.reducer