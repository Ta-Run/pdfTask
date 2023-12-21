import { PayloadAction, createAsyncThunk, createSlice, current, nanoid } from '@reduxjs/toolkit'
interface User {
    name: string,
    fetchUserData: String | [],
    fetchPdfData: String | [],
    data: {
        id: String,
        name: string,
    }[];
}

const initialState: User = {
    data: [],
    name: 'addUser',
    fetchUserData: [],
    fetchPdfData: []
}

export const fetchData = createAsyncThunk("fetchUser", async () => {
    const result = await fetch("http://localhost:3000/api/userdetail");
    return result.json();
});

// export const postPDf = createAsyncThunk("postPdf",async()=>{
//     const result = await fetch("http://localhost:3000/api/userdetail");
//     return result.json();
// })

export const fetchPdf = createAsyncThunk("fetchPdf", async () => {
    const result = await fetch("http://localhost:3000/api/pdfFiles");
    return result.json();
});

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
        builder.addCase(fetchData.fulfilled, fetchPdf.fulfilled, (state: { issLoading: boolean; fetchUserData: string | {}, fetchPdfData: string | {} }, action: PayloadAction<String>) => {
            state.issLoading = false,
                state.fetchUserData = action.payload,
                state.fetchPdfData = action.payload

        })
    }
})


export const { addUser } = Slice.actions;
export default Slice.reducer;