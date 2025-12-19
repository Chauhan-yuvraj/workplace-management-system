/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

import { 
  getVisitors, 
  createVisitor as createVisitorService, 
  updateVisitor as updateVisitorService, 
  deleteVisitor as deleteVisitorService 
} from '../../services/visitors.service';
import type { Visitor } from '@/types/visitor';

interface VisitorState {
  visitors: Visitor[];
  isLoading: boolean;
  error: string | null;
}

const initialState: VisitorState = {
  visitors: [],
  isLoading: false,
  error: null,
};

// Async Thunks
export const fetchVisitors = createAsyncThunk(
  'visitors/fetchVisitors',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getVisitors();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch visitors');
    }
  }
);

export const addVisitor = createAsyncThunk(
  'visitors/addVisitor',
  async (visitorData: Partial<Visitor> | FormData, { rejectWithValue }) => {
    try {
      const response = await createVisitorService(visitorData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add visitor');
    }
  }
);

export const updateVisitor = createAsyncThunk(
  'visitors/updateVisitor',
  async ({ id, data }: { id: string; data: Partial<Visitor> | FormData }, { rejectWithValue }) => {
    try {
      const response = await updateVisitorService(id, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update visitor');
    }
  }
);

export const deleteVisitor = createAsyncThunk(
  'visitors/deleteVisitor',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteVisitorService(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete visitor');
    }
  }
);

const visitorSlice = createSlice({
  name: 'visitors',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Visitors
      .addCase(fetchVisitors.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVisitors.fulfilled, (state, action: PayloadAction<Visitor[]>) => {
        state.isLoading = false;
        state.visitors = action.payload;
      })
      .addCase(fetchVisitors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Add Visitor
      .addCase(addVisitor.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addVisitor.fulfilled, (state, action: PayloadAction<Visitor>) => {
        state.isLoading = false;
        state.visitors.push(action.payload);
      })
      .addCase(addVisitor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update Visitor
      .addCase(updateVisitor.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateVisitor.fulfilled, (state, action: PayloadAction<Visitor>) => {
        state.isLoading = false;
        const index = state.visitors.findIndex((v) => v._id === action.payload._id);
        if (index !== -1) {
          state.visitors[index] = action.payload;
        }
      })
      .addCase(updateVisitor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete Visitor
      .addCase(deleteVisitor.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteVisitor.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.visitors = state.visitors.filter((v) => v._id !== action.payload);
      })
      .addCase(deleteVisitor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = visitorSlice.actions;
export default visitorSlice.reducer;
