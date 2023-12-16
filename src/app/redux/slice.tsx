import { PayloadAction, createAsyncThunk, createSlice, current, nanoid } from '@reduxjs/toolkit'
interface User {
    name: string,
    fetchUserData: String | [],
    data: {
        id: String,
        name: string,
    }[];
}

const initialState: User = {
    data: [],
    name: 'addUser',
    fetchUserData: []
}

export const fetchData = createAsyncThunk("fetchUer", async () => {
    const result = await fetch("http://localhost:3000/api/userdetail");
    return result.json();
});

// export const postPDf = createAsyncThunk("postPdf",async()=>{
//     const result = await fetch("http://localhost:3000/api/userdetail");
//     return result.json();
// })

const Slice = createSlice({
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<string>) => {
            const newData: any = {
                id: nanoid(),
                name: action.payload
            }
            let localData = JSON.stringify(current(state.data))
            state.data.push(newData);
            localStorage.setItem('users', localData)
        }
    },
    name: 'addUser',

    extraReducers: (builder: any) => {
        builder.addCase(fetchData.fulfilled, (state: { issLoading: boolean; fetchUserData: string | {} }, action: PayloadAction<String>) => {
            state.issLoading = false,
                state.fetchUserData = action.payload
        })
    }
})


export const { addUser } = Slice.actions;
export default Slice.reducer;