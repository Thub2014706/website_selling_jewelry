import { createSlice } from '@reduxjs/toolkit';



const addressSlice = createSlice({
    name: 'address',
    initialState: {
        selectAddress: null
    },
    reducers: {
        getSelect: (state, action) => {
            state.selectAddress = action.payload
        }
    }
})

export const { getSelect } = addressSlice.actions;
export default addressSlice.reducer;