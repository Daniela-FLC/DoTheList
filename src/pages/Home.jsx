import { FaCircle, FaTimes, FaTrash, FaStar, FaRegStar } from "react-icons/fa"
import { LuListTodo } from "react-icons/lu"
import { LiaNewspaperSolid } from "react-icons/lia"

import { CheckBox, TextField } from "../components"
import "../GlobalStyle.css"
import { useState } from "react"

export default function Home() {
  const [activeTodo, setActiveTodo] = useState(0)
  const [todoList, setTodoList] = useState([
    {
      id: 1,
      name: "Sample To Do",
      description: "This is a sample to do item.",
      date: "Jan 15",
      pinned: false,
      activities: [
        {
          id: 1,
          name: "This is a sample activity for the to do item.",
          status: "done",
          type: "note",
        },
      ],
    },
    {
      id: 2,
      name: "Grocery Shopping",
      description: "Buy groceries for the week.",
      date: "Jan 15",
      pinned: false,
      activities: [
        {
          id: 1,
          name: "Carrot.",
          status: "done",
          type: "checkbox",
        },
        {
          id: 2,
          name: "Potato.",
          status: "done",
          type: "checkbox",
        },
        {
          id: 3,
          name: "Onion.",
          status: "done",
          type: "checkbox",
        },
      ],
    },
  ])

  const togglePin = () => {
    setTodoList((prevList) =>
      prevList.map((todo, index) =>
        index === activeTodo ? { ...todo, pinned: !todo.pinned } : todo
      )
    )
  }

  const removeTodo = () => {
    setTodoList((prevList) => {
      const newList = prevList.filter((_, index) => index !== activeTodo)
      const newActive = activeTodo > 0 ? activeTodo - 1 : 0
      setActiveTodo(newActive)
      return newList
    })
  }

  const handleCheckBox = (checked, activity) => {
    setTodoList((prevList) =>
      prevList.map((todo, index) => {
        if (index === activeTodo) {
          return {
            ...todo,
            activities: todo.activities.map((a) =>
              a.id === activity.id
                ? { ...a, status: checked ? "done" : "pending" }
                : a
            ),
          }
        }
        return todo
      })
    )
  }

  const handleActivityNameChange = (activityId, newName) => {
    setTodoList((prevList) =>
      prevList.map((todo, index) => {
        if (index === activeTodo) {
          return {
            ...todo,
            activities: todo.activities.map((a) =>
              a.id === activityId ? { ...a, name: newName } : a
            ),
          }
        }
        return todo
      })
    )
  }

  const removeActivity = (activityId) => {
    setTodoList((prevList) =>
      prevList.map((todo, index) => {
        if (index === activeTodo) {
          return {
            ...todo,
            activities: todo.activities.filter((a) => a.id !== activityId),
          }
        }
        return todo
      })
    )
  }

  return (
    <div className="home-container">
      <div className="todo-list">
        <div className="todo-header">
          <LiaNewspaperSolid />
          <h1 className="title">To Do List</h1>
        </div>
        <div id="todo-list-container">
          {todoList.map((todo, index) => (
            <div
              key={todo.id}
              className="todo-table-item"
              onClick={() => setActiveTodo(index)}
            >
              <LuListTodo />
              <div className="body">
                <div>
                  <h2>{todo.name}</h2>
                  <FaCircle />
                  <p>{todo.date}</p>
                </div>
                <p className="description">{todo.description}</p>
              </div>
              <p className="activity">{todo.activities.length}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="todo-preview">
        <div className="todo-activities">
          <div
            style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
          >
            <div className="todo-header">
              <LuListTodo />
              <h1 className="title">{todoList[activeTodo].name}</h1>
              <div>
                <button className="pin-btn" onClick={togglePin}>
                  {todoList[activeTodo].pinned ? (
                    <FaStar color="gold" />
                  ) : (
                    <FaRegStar />
                  )}
                </button>
                <button className="delete-btn" onClick={removeTodo}>
                  <FaTrash color="red" />
                </button>
              </div>
            </div>
            <TextField
              className="todo-description"
              placeholder="Add a description..."
              value={todoList[activeTodo].description}
              onChange={(e) => {
                const newDescription = e.target.value
                setTodoList((prevList) =>
                  prevList.map((todo, index) =>
                    index === activeTodo
                      ? { ...todo, description: newDescription }
                      : todo
                  )
                )
              }}
              style={{ fontSize: ".9rem", color: "gray" }}
            />
          </div>

          <div style={{ display: "flex", gap: ".5rem" }}>
            <select></select>
            <TextField
              style={{
                backgroundColor: "lightgray",
              }}
              action={{
                label: "Add",
                onClick: (value) => {
                  todoList[activeTodo].activities.push({
                    id: todoList[activeTodo].activities.length + 1,
                    name: value,
                    status: "pending",
                    type: "note",
                  })
                  console.log(
                    "New activity added:",
                    todoList[activeTodo].activities
                  )
                },
              }}
            />
          </div>

          <div className="todo-activity-list">
            {todoList[activeTodo].activities.map((activity) => (
              <div key={activity.id} className="todo-activity-item">
                {activity.type === "checkbox" && (
                  <CheckBox
                    checked={activity.status === "done"}
                    onChange={(checked) => handleCheckBox(checked, activity)}
                  />
                )}
                <TextField
                  value={activity.name}
                  onChange={(e) =>
                    handleActivityNameChange(activity.id, e.target.value)
                  }
                />
                <button
                  className="activity-remove-btn"
                  onClick={() => removeActivity(activity.id)}
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
