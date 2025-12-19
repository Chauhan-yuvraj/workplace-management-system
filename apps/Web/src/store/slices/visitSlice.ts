/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { 
  getVisits, 
  scheduleVisit as scheduleVisitService, 
  updateVisit as updateVisitService, 
  deleteVisit as deleteVisitService 
} from '../../services/visits.service';
import type { Visit, CreateVisitPayload, UpdateVisitPayload } from '@/types/visit';

interface VisitState {
  visits: Visit[];
  isLoading: boolean;
  error: string | null;
}

const initialState: VisitState = {
  visits: [],
  isLoading: false,
  error: null,
};

// Async Thunks
export const fetchVisits = createAsyncThunk(
  'visits/fetchVisits',
  async ({ status, hostId }: { status?: string; hostId?: string } = {}, { rejectWithValue }) => {
    try {
      const response = await getVisits(status, hostId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch visits');
    }
  }
);

export const scheduleVisit = createAsyncThunk(
  'visits/scheduleVisit',
  async (payload: CreateVisitPayload, { rejectWithValue }) => {
    try {
      const response = await scheduleVisitService(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to schedule visit');
    }
  }
);

export const updateVisit = createAsyncThunk(
  'visits/updateVisit',
  async ({ id, data }: { id: string; data: UpdateVisitPayload }, { rejectWithValue }) => {
    try {
      const response = await updateVisitService(id, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update visit');
    }
  }
);

export const deleteVisit = createAsyncThunk(
  'visits/deleteVisit',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteVisitService(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete visit');
    }
  }
);

const visitSlice = createSlice({
  name: 'visits',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Visits
      .addCase(fetchVisits.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVisits.fulfilled, (state, action: PayloadAction<Visit[]>) => {
        state.isLoading = false;
        state.visits = action.payload;
      })
      .addCase(fetchVisits.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Schedule Visit
      .addCase(scheduleVisit.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(scheduleVisit.fulfilled, (state, action: PayloadAction<Visit>) => {
        state.isLoading = false;
        state.visits.push(action.payload);
      })
      .addCase(scheduleVisit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update Visit
      .addCase(updateVisit.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateVisit.fulfilled, (state, action: PayloadAction<Visit>) => {
        state.isLoading = false;
        const index = state.visits.findIndex((v) => v._id === action.payload._id);
        if (index !== -1) {
          state.visits[index] = action.payload;
        }
      })
      .addCase(updateVisit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete Visit
      .addCase(deleteVisit.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteVisit.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.visits = state.visits.filter((v) => v._id !== action.payload);
      })
      .addCase(deleteVisit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = visitSlice.actions;
export default visitSlice.reducer;
