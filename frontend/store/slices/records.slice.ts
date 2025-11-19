import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  saveUserRecord,
} from "@/services/feedback.service";

import { FeedbackRecord, UserRecord, SerializablePathData, SerializableCanvasPage } from '../types/feedback';
import { getRecordsFromAPI } from '@/services/records.service';

interface RecordsState {
  records: FeedbackRecord[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: RecordsState = {
  records: [],
  status: 'idle',
  error: null,
};

type SaveRecordPayload = {
  guestData: UserRecord;
  canvasPages: SerializableCanvasPage[];
  signaturePaths: SerializablePathData[];
};


export const getRecords = createAsyncThunk(
  'records/getRecords',
  async () => {
    const records = await getRecordsFromAPI();
    return records as FeedbackRecord[];
  })

// Thunk to save a new record
export const saveRecord = createAsyncThunk(
  'records/saveRecord',
  async (
    data: SaveRecordPayload,
    { rejectWithValue }
  ) => {
    try {
      const { guestData, canvasPages, signaturePaths } = data;

      const record = await saveUserRecord(guestData, canvasPages, signaturePaths);
      return record as FeedbackRecord;

    } catch (error: any) {
      if (error.response) {
        console.error("❌ Server error:", error.response.status, error.response.data);
      } else if (error.request) {
        console.error("❌ No response - Check if server is running");
        console.error("Request:", error.request);
      } else {
        console.error("❌ Request setup error:", error.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to toggle the featured status
const toggleFeature = createAsyncThunk(
  'records/toggleFeature',
  async ({ id, currentFeaturedStatus }: { id: string, currentFeaturedStatus: boolean }) => {
    const newFeaturedStatus = !currentFeaturedStatus;
    console.log(`Simulating update for record ${id}: featured=${newFeaturedStatus}`);
    return { id, featured: newFeaturedStatus };
  }
);

// Slice definition
const recordsSlice = createSlice({
  name: 'records',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // Save Record
      .addCase(saveRecord.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveRecord.fulfilled, (state) => {
        state.status = 'succeeded';
        // Action: Record successfully saved to API.
        // We DO NOT push to state.records, relying on a future fetch to update the list.
      })
      .addCase(saveRecord.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || action.error.message || null;
      })

      // Toggle Feature
      .addCase(toggleFeature.fulfilled, (state, action: PayloadAction<{ id: string, featured: boolean }>) => {
        const { id, featured } = action.payload;
        const index = state.records.findIndex(record => record.id === id);
        if (index !== -1) {
          state.records[index].guest.featured = featured;
        }
      })
      .addCase(toggleFeature.rejected, (state, action) => {
        console.error("Failed to update feature status:", action.error.message);
      });
  },
});



export default recordsSlice.reducer;
export { toggleFeature };