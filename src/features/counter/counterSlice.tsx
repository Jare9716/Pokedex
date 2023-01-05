import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface counterState{
    value: number;
}

const initialState: counterState = {
    value: 1
}

const counterSlice = createSlice ({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) =>{
            if(state.value>897){
                state.value = 898
                return
            }
            state.value++
        },
        decrement: (state) =>{
            if(state.value<2){
                return state
            }
            state.value--
        },
        //Tenemos una función que permite incrementar el numero en la dimensión cargada dentro de payload
        incrementByAmount: (state, action: PayloadAction<number>) =>{
            if(state.value + action.payload > 897){
                state.value = 898
            }else{
                state.value += action.payload
            }
        },
         //Tenemos una función que permite decrementar el numero en la dimensión cargada dentro de payload
        decrementByAmount: (state, action: PayloadAction<number>) =>{
            if(state.value - action.payload < 2){
                state.value = 1
                return 
            }
                state.value -= action.payload
        },
        start: (state, action: PayloadAction<number>) => {
            state.value = action.payload
            return
        }
    }
})

export const {increment, decrement, incrementByAmount, decrementByAmount, start} = counterSlice.actions
export default counterSlice.reducer