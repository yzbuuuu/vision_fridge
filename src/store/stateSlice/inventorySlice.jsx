import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  latestDetection: null,
  history: [],
  loading: false,
  error: null,
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    fetchLatestDetectionRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchLatestDetectionSuccess: (state, action) => {
      console.log('fetchLatestDetectionSuccess!!!!!!')
      state.loading = false;
      state.latestDetection = action.payload;
    },
    fetchLatestDetectionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchHistoryRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchHistorySuccess: (state, action) => {
      state.loading = false;
      state.history = action.payload;
    },
    fetchHistoryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchLatestDetectionRequest,
  fetchLatestDetectionSuccess,
  fetchLatestDetectionFailure,
  fetchHistoryRequest,
  fetchHistorySuccess,
  fetchHistoryFailure,
} = inventorySlice.actions;

export default inventorySlice.reducer;
