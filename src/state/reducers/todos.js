/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
    initialState: [],
    name: "todosSlice",
    reducers: {
        addTask: (state, action) => {
            if (action.payload.content !== "") {
                state.push(action.payload)
            }
        },
        removeTask: (state, action) => {
            let newStat = state.filter(taskObj => taskObj.id !== action.payload);
            return newStat
        },
        setCompleted: (state, action) => {
            let index = state.findIndex(todoObj => todoObj.id === action.payload);
            state[index].isCompleted = state[index].isCompleted ? false : true;
        },
        removeAllTasks: (state, action) => {
            return []
        }
    }
});

export const { addTask, removeTask, setCompleted, removeAllTasks } = todosSlice.actions;
export default todosSlice.reducer