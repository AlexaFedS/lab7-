import {createSlice} from "@reduxjs/toolkit";

const collectorSlice = createSlice({
    name: 'collector',
    initialState:{
        itemsInCollector:[]
    },
    reducers:{
        setItemInCollector: (state,action)=>{
            state.itemsInCollector.push(action.payload)
        },
        deleteItemFromCollector: (state,action)=>{
            state.itemsInCollector = state.itemsInCollector.filter(disease=> disease.id !== action.payload)
        }
    }
})

export const { setItemInCollector, deleteItemFromCollector } = collectorSlice.actions;
export default collectorSlice.reducer;