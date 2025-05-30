import {
  FaCircle,
  FaTimes,
  FaTrash,
  FaStar,
  FaRegStar,
  FaPlus,
} from "react-icons/fa"
import { LuListTodo } from "react-icons/lu"
import { LiaNewspaperSolid } from "react-icons/lia"

import { CheckBox, TextField } from "../components"
import "../GlobalStyle.css"
import { useEffect, useState } from "react"

function useIsSmallScreen(breakpoint = 768) {
  const [isSmall, setIsSmall] = useState(window.innerWidth <= breakpoint)

  useEffect(() => {
    function onResize() {
      setIsSmall(window.innerWidth <= breakpoint)
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [breakpoint])

  return isSmall
}

export default function Home() {
  const isSmallScreen = useIsSmallScreen()
  const [todoListContent, setTodoListContent] = useState("")
  const [todoListActivities, setTodoListActivities] = useState("")
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
          id: 101,
          name: "This is a sample activity for the to do item.",
          status: "done",
          type: "checkbox",
        },
      ],
    },
    {
      id: 2,
      name: "Grocery Shopping",
      description: "Buy groceries for the week.",
      date: "Feb 9",
      pinned: false,
      activities: [
        {
          id: 201,
          name: "Carrot.",
          status: "pending",
          type: "checkbox",
        },
        {
          id: 202,
          name: "Potato.",
          status: "pending",
          type: "checkbox",
        },
        {
          id: 203,
          name: "Onion.",
          status: "pending",
          type: "checkbox",
        },
      ],
    },
    {
      id: 3,
      name: "Workout Routine",
      description: "Plan the workout routine for the week.",
      date: "Aug 26",
      pinned: false,
      activities: [
        {
          id: 301,
          name: "Push-ups.",
          status: "pending",
          type: "checkbox",
        },
        {
          id: 302,
          name: "Squats.",
          status: "pending",
          type: "checkbox",
        },
        {
          id: 303,
          name: "Lunges.",
          status: "pending",
          type: "checkbox",
        },
      ],
    },
  ])

  const togglePin = () => {
    setTodoList((prevList) => {
      const updatedList = prevList.map((todo, index) =>
        index === activeTodo ? { ...todo, pinned: !todo.pinned } : todo
      )

      const sortedList = [...updatedList].sort(
        (a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)
      )

      const toggledId = prevList[activeTodo].id
      const newActiveIndex = sortedList.findIndex(
        (todo) => todo.id === toggledId
      )

      setActiveTodo(newActiveIndex)

      return sortedList
    })
  }

  const removeTodo = () => {
    setTodoList((prevList) => {
      const newList = prevList.filter((_, index) => index !== activeTodo)
      const newActive = activeTodo > 0 ? activeTodo - 1 : 0
      newList.length === 0 ? setActiveTodo(0) : setActiveTodo(newActive)
      return newList
    })
  }

  const handleCheckBox = (checked, activityId) => {
    setTodoList((prevList) =>
      prevList.map((todo, index) => {
        if (index === activeTodo) {
          return {
            ...todo,
            activities: todo.activities.map((a) =>
              a.id === activityId
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

  const [refresh, setRefresh] = useState(false)
  useEffect(() => {
    if (todoList.length === 0) {
      setTodoListContent("No To Do Available")
      setTodoListActivities("No activities yet.")
      return
    }

    setTodoListContent(
      todoList
        .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))
        .map((todo, index) => (
          <div
            key={todo.id}
            className={`todo-table-item ${
              activeTodo === index ? "active" : ""
            }`}
            onClick={() => setActiveTodo(index)}
          >
            <LuListTodo />
            <div className="body">
              <div>
                <h2>{todo.name}</h2>
                {/* <FaCircle /> */}
                <p>{todo.date}</p>
              </div>
              <p className="description">{todo.description}</p>
            </div>
            {/* <p className="activity">{todo.activities.length}</p> */}
          </div>
        ))
    )

    setTodoListActivities(
      todoList[activeTodo].activities.length > 0
        ? todoList[activeTodo].activities.map((activity) => (
            <div key={activity.id} className="todo-activity-item">
              {activity.type === "checkbox" && (
                <CheckBox
                  checked={activity.status === "done"}
                  onChange={(checked) => handleCheckBox(checked, activity.id)}
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
          ))
        : "No activities yet."
    )
  }, [refresh, activeTodo, todoList])

  return (
    // <div className="home-container">
    <div
      className={`home-container ${
        activeTodo !== null && activeTodo !== 0 ? "show-preview" : ""
      }`}
    >
      <div className="todo-list">
        <div className="todo-header">
          <LiaNewspaperSolid />
          <h1 className="title">To Do List</h1>
          <button
            className="activity-remove-btn"
            onClick={() => {
              todoList.push({
                id: todoList.length + 1,
                name: "New To Do",
                description: "",
                date: new Date().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                }),
                pinned: false,
                activities: [],
              })
              setRefresh((prev) => !prev)
            }}
            style={{
              outline: "none",
              background: "transparent",
              border: "none",
            }}
          >
            <FaPlus size={20} />
          </button>
        </div>
        <div id="todo-list-container">{todoListContent}</div>
      </div>

      <div className="todo-preview">
        {isSmallScreen && (
          <button
            onClick={() => setActiveTodo(0)}
            className="close-preview-btn"
            aria-label="Close Preview"
          >
            Close
          </button>
        )}

        {todoList.length > 0 ? (
          <div className="todo-activities">
            <div
              style={{ display: "flex", flexDirection: "column", gap: ".2rem" }}
            >
              <div className="todo-header">
                <LuListTodo size={35} />
                <TextField
                  className="todo-name"
                  placeholder="Add name..."
                  value={todoList[activeTodo]?.name}
                  onChange={(e) => {
                    const newName = e.target.value
                    setTodoList((prevList) =>
                      prevList.map((todo, index) =>
                        index === activeTodo ? { ...todo, name: newName } : todo
                      )
                    )
                  }}
                  textStyle={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  }}
                />
                <div>
                  <button className="pin-btn" onClick={togglePin}>
                    {todoList[activeTodo]?.pinned ? (
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
                value={todoList[activeTodo]?.description}
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
                textStyle={{
                  fontSize: ".9rem",
                  color: "gray",
                }}
              />
            </div>

            <TextField
              className="todo-activity-input"
              placeholder="Add an activity..."
              style={{
                backgroundColor: "lightgray",
              }}
              action={{
                label: "Add",
                onClick: (value) => {
                  if (!value.trim()) return
                  setTodoList((prevList) =>
                    prevList.map((todo, index) =>
                      index === activeTodo
                        ? {
                            ...todo,
                            activities: [
                              ...todo.activities,
                              {
                                id: Date.now(),
                                name: value,
                                status: "pending",
                                type: "checkbox",
                              },
                            ],
                          }
                        : todo
                    )
                  )
                },
              }}
            />

            <div className="todo-activity-list">{todoListActivities}</div>
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LuListTodo size={100} color="gray" />
            <h2 style={{ textAlign: "center", color: "gray", width: "100%" }}>
              No To Do Selected
            </h2>
          </div>
        )}
      </div>
    </div>
  )
}
