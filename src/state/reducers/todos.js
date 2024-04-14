/* eslint-disable no-unused-vars */
import { combineReducers, createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
    // initialState should be an object not an array :)
    initialState: { todos: [] },
    name: "todosSlice",
    reducers: {
        addTask: (state, action) => {
            if (action.payload.content !== "") {
                return {
                    todos: [...state.todos, action.payload]
                }
            }
        },
        removeTask: (state, action) => {
            let newStat = { todos: state.todos.filter(taskObj => taskObj.id !== action.payload) };
            return newStat
        },
        setCompleted: (state, action) => {
            let index = state.todos.findIndex(todoObj => todoObj.id === action.payload);
            state.todos[index].isCompleted = state.todos[index].isCompleted ? false : true;
        },
        removeAllTasks: (state, action) => {
            return { todos: [] }
        }
    }
});

export const { addTask, removeTask, setCompleted, removeAllTasks } = todosSlice.actions;
export default todosSlice.reducer