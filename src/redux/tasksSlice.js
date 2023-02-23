import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchTasks, addTask, deleteTask, toggleCompleted } from './operations';

const arrayActions = [fetchTasks, addTask, deleteTask, toggleCompleted];
const getActions = type => arrayActions.map(action => action[type]);

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    return builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          task => task.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(toggleCompleted.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          task => task.id === action.payload.id
        );
        state.items.splice(index, 1, action.payload);
      })
      .addMatcher(
        isAnyOf(
          ...getActions('pending')
        ),
        state => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          ...getActions('rejected')
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(
          ...getActions('fulfilled')
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = null;
        }
      );
  },
});

export const tasksReducer = tasksSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";
// import { fetchTasks } from "./operations";

// const tasksSlice = createSlice({
//   name: "tasks",
//   initialState: {
//     items: [],
//     isLoading: false,
//     error: null,
//   },
//   extraReducers: {
//     [fetchTasks.pending] (state) {
//       state.isLoading = true;
//     },
//     [fetchTasks.fulfilled](state, action)  {
//       state.isLoading = false;
//       state.error = null;
//       state.items = action.payload;
//      },
//     [fetchTasks.error](state, action) {
//       state.isLoading = false;
//       state.error = action.payload;
//     },
//   },
// });

// export const tasksReducer = tasksSlice.reducer;
