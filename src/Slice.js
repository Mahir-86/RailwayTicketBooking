import { createSlice } from "@reduxjs/toolkit";
const counterSlice=createSlice({
    initialState: 1,
    name:'counter',
    reducers:{
        increase:(state)=>state+1,
        decrease: (state)=> state-1,
    },
})

export const {increase,decrease}=counterSlice.actions
export default counterSlice.reducer