import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import employeeReducer from './slices/employeeSlice'
import visitorReducer from './slices/visitorSlice'
import visitReducer from './slices/visitSlice'
import recordReducer from './slices/recordSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        employees: employeeReducer,
        visitors: visitorReducer,
        visits: visitReducer,
        records: recordReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
