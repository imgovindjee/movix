import { createSlice } from '@reduxjs/toolkit'


export const homeSlice = createSlice({
    name: 'home',
    initialState: {
        url: {},
        genres: {}
    },
    reducers: {
        get_API_Configuration: (state, action) => {
            state.url = action.payload;
        },
        get_Genres: (state, action) => {
            state.genres = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { get_API_Configuration, get_Genres } = homeSlice.actions

export default homeSlice.reducer