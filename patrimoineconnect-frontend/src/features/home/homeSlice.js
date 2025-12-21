
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    projets: [],          
    etapes: [],          
    isLoading: false,     
    error: null          
};


const homeSlice = createSlice({
    name: "home",           
    initialState,          
    reducers: {
        
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },

        setProjets: (state, action) => {
            state.projets = action.payload;
            state.isLoading = false;
        },
        setEtapes: (state, action) => {
            state.etapes = action.payload;
            state.isLoading = false;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },

        clearError: (state) => {
            state.error = null;
        }
    }
});


export const { setLoading, setProjets, setEtapes, setError, clearError } = homeSlice.actions;

export default homeSlice.reducer;

