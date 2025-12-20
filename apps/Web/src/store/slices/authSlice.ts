import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit';
import { authService } from '../../services/auth.service';
import type { Employee } from '@/types/user';
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    id: string;
    role: string;
    permissions: string[];
    iat: number;
    exp: number;
}

interface AuthState {
    user: Employee | null;
    token: string | null;
    permissions: string[];
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    permissions: [],
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

// Async Thunk for Login
export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await authService.login(email, password);
            console.log(response)
            return response;
        } catch (error: unknown) {
            return rejectWithValue(error);
        }
    }
);

export const fetchCurrentUser = createAsyncThunk(
    'auth/fetchCurrentUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await authService.getMe();
            return response.data;
        } catch (error: unknown) {
            return rejectWithValue(error);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        refreshSuccess: (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = true;
            if (action.payload) {
                try {
                    const decoded = jwtDecode<DecodedToken>(action.payload);
                    state.permissions = decoded.permissions || [];
                } catch (error) {
                    console.error("Failed to decode token", error);
                    state.permissions = [];
                }
            }
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.permissions = [];
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.accessToken;
                if (action.payload.accessToken) {
                    try {
                        const decoded = jwtDecode<DecodedToken>(action.payload.accessToken);
                        state.permissions = decoded.permissions || [];
                        console.log(state.permissions)
                    } catch (error) {
                        console.error("Failed to decode token", error);
                        state.permissions = [];
                    }
                }
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
                state.permissions = [];
                state.error = action.payload as string;
            })
            .addCase(fetchCurrentUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(fetchCurrentUser.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            });
    },
});

export const { logout, clearError, refreshSuccess } = authSlice.actions;
export default authSlice.reducer;

