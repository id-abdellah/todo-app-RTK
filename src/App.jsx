/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useRef } from "react";
import { addTask, removeTask, setCompleted, removeAllTasks } from "./state/reducers/todos";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
  const todosState = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    const openModalButton = document.querySelector(".open-modal");

    const modal = document.querySelector(".add-new-task-modal");
    const modal_input = modal.querySelector("input");
    const modal_cancel = modal.querySelector(".cancel");
    const modal_addTask = modal.querySelector(".add");

    openModalButton.addEventListener("click", () => {
      modal.showModal()
    })

    modal_cancel.addEventListener("click", () => {
      modal.close();
      modal_input.value = "";
    })

    modal_addTask.addEventListener("click", () => {
      const taskContent = modal_input.value;
      const taskObj = {
        id: Date.now(),
        content: taskContent,
        isCompleted: false,
      };
      dispatch(addTask(taskObj));
      modal_input.value = "";
      modal.close()
    })

  }, []);

  function removeTaskHandler(taskId) {
    dispatch(removeTask(taskId))
  }

  function setCompletedHandler(taskId) {
    dispatch(setCompleted(taskId))
  }

  function removeAllTasksHandler() {
    if (confirm("you sure?")) {
      dispatch(removeAllTasks())
    }
  }

  return (
    <>
      <div className="app-container">

        <div className="header">
          <div>Simple Todo</div>
        </div>

        <div className="todos-wrapper">

          <ul>
            <div style={{ display: todosState.length !== 0 ? "none" : "block" }}>Not task has been added yet... </div>
            {
              todosState.map(todoObj => {
                return <li data-taskid={todoObj.id} key={Math.random()}>
                  <p className={todoObj.isCompleted ? "completed" : ""} onClick={() => setCompletedHandler(todoObj.id)}>{todoObj.content}</p>
                  <ion-icon name="trash-outline" onClick={() => removeTaskHandler(todoObj.id)}></ion-icon>
                </li>
              })
            }
          </ul>
          <button
            style={{ display: todosState.length !== 0 ? "block" : "none" }}
            className="remove-all"
            onClick={() => removeAllTasksHandler()}>
            Remove all tasks
          </button>
          <button className="open-modal">+ New Task</button>
        </div>

        <NewTaskModal />
      </div>
    </>
  )
}

function NewTaskModal() {
  return (
    <dialog className="add-new-task-modal">

      <div className="wrapper">
        <input type="text" className="task-content" />
        <div>
          <button className="add">Add Task</button>
          <button className="cancel">Cancel</button>
        </div>
      </div>

    </dialog>
  )
}