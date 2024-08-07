import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import url from "../config";

const initialState = {
  loading: false,
  message: undefined,
  error: undefined
};

export const regSlice = createSlice({
  name: 'reg',
  initialState,
  reducers: {
    reset: (state, action) => {
      state.message = undefined;
      state.error = undefined;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(regThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(regThunk.fulfilled, (state, action) => {
      const payload = action.payload;
      state.message = payload.message;
      state.loading = false;
    });
    builder.addCase(regThunk.rejected, (state, action) => {
      const payload = action.payload;
      state.error = payload;
      state.loading = false;
    });
  }
});

export const regThunk = createAsyncThunk('regThunk', async (data, { rejectWithValue }) => {
  try {
    const result = await fetch(`${url}/reg`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        "ngrok-skip-browser-warning": "69420",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    const json = await result.json();
    if (result.status === 400) {
      return rejectWithValue(json);
    }
    return json;
  } catch (error) {
    console.log(error);
    return rejectWithValue("Что-то не так");
  }
});

export const { reset } = regSlice.actions;

export default regSlice.reducer;