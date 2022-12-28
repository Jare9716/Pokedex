import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface counterState{
    value: number;
}

const initialState: counterState = {
    value: 0
}

const counterSlice = createSlice ({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) =>{
            state.value++
        },
        decrement: (state) =>{
            state.value--
        },
        //Tenemos una función que permite incrementar el numero en la dimensión cargada dentro de payload
        incrementByAmount: (state, action: PayloadAction<number>) =>{
            state.value += action.payload
        },
         //Tenemos una función que permite decrementar el numero en la dimensión cargada dentro de payload
        decrementByAmount: (state, action: PayloadAction<number>) =>{
            state.value -= action.payload
        },
        reset: (state) => {
            state.value = 0
        }
    }
})

export const {increment, decrement, incrementByAmount, decrementByAmount, reset} = counterSlice.actions
export default counterSlice.reducer