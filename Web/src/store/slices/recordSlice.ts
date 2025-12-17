/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { getRecords, deleteRecord as deleteRecordService } from '../../services/records.service';
import type { Record } from '@/types/record';

interface RecordState {
  records: Record[];
  isLoading: boolean;
  error: string | null;
}

const initialState: RecordState = {
  records: [],
  isLoading: false,
  error: null,
};

// Async Thunks
export const fetchRecords = createAsyncThunk(
  'records/fetchRecords',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRecords();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch records');
    }
  }
);

export const deleteRecord = createAsyncThunk(
  'records/deleteRecord',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteRecordService(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete record');
    }
  }
);

const recordSlice = createSlice({
  name: 'records',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Records
      .addCase(fetchRecords.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecords.fulfilled, (state, action: PayloadAction<Record[]>) => {
        state.isLoading = false;
        state.records = action.payload;
      })
      .addCase(fetchRecords.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete Record
      .addCase(deleteRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteRecord.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.records = state.records.filter((r) => r._id !== action.payload);
      })
      .addCase(deleteRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = recordSlice.actions;
export default recordSlice.reducer;
