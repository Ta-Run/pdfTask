import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'


interface User {
    name: string,
    data: {
        id: String,
        name: string,
    }[];
}

const initialState: User = {
    data: [],
    name: 'addUser'
}
   console.log(initialState)
const Slice = createSlice({
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<string>) => {
            console.log(action);
            const newData: any = {
                id: nanoid(),
                name: action.payload
            }
            state.data.push(newData)
        }
    },
    name: 'addUser'
})
console.log(Slice.actions)
export const { addUser } = Slice.actions;
export default Slice.reducer;