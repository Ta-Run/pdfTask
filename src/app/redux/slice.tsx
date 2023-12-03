import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
    users: []
}
interface User {
    name: string,
    data: any
    //   id:string
}

const Slice = createSlice({
    initialState,
    reducers: {
        addUser: (state, action) => {
            const data:{}= {
                id: nanoid(),
                name: action.name
            }
            state.users.push(data)
        }
    },
    name: ''
})

export const {addUser} = Slice.actions;
export default Slice.reducer;