import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Delivery, CreateDeliveryPayload } from "@/types/delivery";
import * as deliveryService from "@/services/delivery.service";

interface DeliveryState {
  deliveries: Delivery[];
  loading: boolean;
  error: string | null;
}

const initialState: DeliveryState = {
  deliveries: [],
  loading: false,
  error: null,
};

export const fetchDeliveries = createAsyncThunk("deliveries/fetchAll", async () => {
  return await deliveryService.getDeliveries();
});

export const addDelivery = createAsyncThunk("deliveries/add", async (payload: CreateDeliveryPayload) => {
  return await deliveryService.createDelivery(payload);
});

export const updateDeliveryStatus = createAsyncThunk(
  "deliveries/updateStatus",
  async ({ id, status }: { id: string; status: string }) => {
    return await deliveryService.updateDeliveryStatus(id, status);
  }
);

export const deleteDelivery = createAsyncThunk("deliveries/delete", async (id: string) => {
  await deliveryService.deleteDelivery(id);
  return id;
});

const deliverySlice = createSlice({
  name: "deliveries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeliveries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeliveries.fulfilled, (state, action) => {
        state.loading = false;
        state.deliveries = action.payload;
      })
      .addCase(fetchDeliveries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch deliveries";
      })
      .addCase(addDelivery.fulfilled, (state, action) => {
        state.deliveries.unshift(action.payload);
      })
      .addCase(updateDeliveryStatus.fulfilled, (state, action) => {
        const index = state.deliveries.findIndex((d) => d._id === action.payload._id);
        if (index !== -1) {
          state.deliveries[index] = action.payload;
        }
      })
      .addCase(deleteDelivery.fulfilled, (state, action) => {
        state.deliveries = state.deliveries.filter((d) => d._id !== action.payload);
      });
  },
});

export default deliverySlice.reducer;
