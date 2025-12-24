/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

import {
  fetchActiveEmployees as fetchActiveEmployeesService,
  getEmployees as getEmployeesService,
  createEmployee as createEmployeeService,
  updateEmployee as updateEmployeeService,
  deleteEmployee as deleteEmployeeService,
  toggleEmployeeStatus as toggleEmployeeStatusService
} from '../../services/employees.service';
import type { Employee } from '@/types/user';
import type { ActiveEmployeeOption } from '@repo/types';



interface EmployeeState {
  employees: Employee[];           // Full list for Tables/Management
  activeEmployees: ActiveEmployeeOption[]; // Simplified list for Dropdowns/Selects
  isLoading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  activeEmployees: [],
  isLoading: false,
  error: null,
};

// Async Thunks
export const fetchActiveEmployees = createAsyncThunk(
  'employees/fetchActiveEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchActiveEmployeesService();
      // TypeScript needs to know this returns the simplified list
      return response as ActiveEmployeeOption[]; 
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch active employees');
    }
  }
);

export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getEmployeesService();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch employees');
    }
  }
);

// ... (Your other thunks: addEmployee, updateEmployee, deleteEmployee remain unchanged) ...
export const addEmployee = createAsyncThunk(
  'employees/addEmployee',
  async (employeeData: Partial<Employee> | FormData, { rejectWithValue }) => {
    try {
      const response = await createEmployeeService(employeeData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add employee');
    }
  }
);

export const updateEmployee = createAsyncThunk(
  'employees/updateEmployee',
  async ({ id, data }: { id: string; data: Partial<Employee> | FormData }, { rejectWithValue }) => {
    try {
      const response = await updateEmployeeService(id, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update employee');
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  'employees/deleteEmployee',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteEmployeeService(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete employee');
    }
  }
);

export const toggleEmployeeStatus = createAsyncThunk(
  'employees/toggleStatus',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await toggleEmployeeStatusService(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to toggle employee status');
    }
  }
);

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Handle Active Employees (Simplified List) ---
      .addCase(fetchActiveEmployees.pending, (state) => {
        // You might want a separate isLoading for this, or share the main one
        state.isLoading = true; 
        state.error = null;
      })
      .addCase(fetchActiveEmployees.fulfilled, (state, action: PayloadAction<ActiveEmployeeOption[]>) => {
        state.isLoading = false;
        // Update the NEW property, not the main employees list
        state.activeEmployees = action.payload; 
      })
      .addCase(fetchActiveEmployees.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // --- Handle Full Employees List ---
      .addCase(fetchEmployees.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action: PayloadAction<Employee[]>) => {
        state.isLoading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // ... (Rest of your reducers: Add, Update, Delete, Toggle remain unchanged)
      // Add Employee
      .addCase(addEmployee.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addEmployee.fulfilled, (state, action: PayloadAction<Employee>) => {
        state.isLoading = false;
        if (action.payload) {
          state.employees.push(action.payload);
        }
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update Employee
      .addCase(updateEmployee.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action: PayloadAction<Employee>) => {
        state.isLoading = false;
        const index = state.employees.findIndex((emp) => emp._id === action.payload._id);
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete Employee
      .addCase(deleteEmployee.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.employees = state.employees.filter((emp) => emp._id !== action.payload);
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Toggle Status
      .addCase(toggleEmployeeStatus.fulfilled, (state, action: PayloadAction<Employee>) => {
        const index = state.employees.findIndex((emp) => emp._id === action.payload._id);
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      });
  },
});

export const { clearError } = employeeSlice.actions;
export default employeeSlice.reducer;