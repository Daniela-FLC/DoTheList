import {
  FaTimes,
  FaTrash,
  FaStar,
  FaRegStar,
  FaPlus,
  FaArrowLeft,
  FaTasks,
} from "react-icons/fa"
import { LuListTodo } from "react-icons/lu"
import { LiaNewspaperSolid } from "react-icons/lia"

import { CheckBox, TextField } from "../components"
import "../GlobalStyle.css"
import { useEffect, useState } from "react"
import { Colors } from "../constants"

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
  const isSmallScreen = useIsSmallScreen(990)
  const [todoListContent, setTodoListContent] = useState("")
  const [todoListActivities, setTodoListActivities] = useState("")
  const [activeTodo, setActiveTodo] = useState(null)
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
    if (
      activeTodo === null ||
      activeTodo < 0 ||
      activeTodo >= todoList.length
    ) {
      console.warn("Invalid activeTodo index:", activeTodo)
      return
    }

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
    if (
      activeTodo === null ||
      activeTodo < 0 ||
      activeTodo >= todoList.length
    ) {
      console.warn("Invalid activeTodo index:", activeTodo)
      return
    }

    setTodoList((prevList) => {
      const newList = prevList.filter((_, index) => index !== activeTodo)
      const newActive = activeTodo > 0 ? activeTodo - 1 : 0
      isSmallScreen || (newList.length === 0 && newList.length <= newActive)
        ? setActiveTodo(null)
        : setActiveTodo(newActive)
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

  const handleAddActivity = (value) => {
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
      setTodoListContent(
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LiaNewspaperSolid size={100} color="gray" />
          <h2
            style={{
              textAlign: "center",
              color: "gray",
              width: "100%",
              fontSize: "1rem",
            }}
          >
            No To Do Available
          </h2>
        </div>
      )
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
            onClick={() =>
              activeTodo === index ? setActiveTodo(null) : setActiveTodo(index)
            }
            style={{ zIndex: 2 }}
          >
            <LuListTodo />
            <div className="body">
              <div>
                <h2>{todo.name}</h2>
                <p>{todo.date}</p>
              </div>
              <p className="description">{todo.description}</p>
            </div>
          </div>
        ))
    )

    if (
      activeTodo === null ||
      activeTodo < 0 ||
      activeTodo >= todoList.length
    ) {
      console.warn("Invalid activeTodo index:", activeTodo)
      return
    }

    setTodoListActivities(
      todoList[activeTodo].activities.length > 0 ? (
        todoList[activeTodo].activities.map((activity) => (
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
      ) : (
        <div
          style={{
            width: "100%",
            marginTop: "4rem",
          }}
        >
          <FaTasks size={80} color="gray" />
          <h2 style={{ textAlign: "center", color: "gray", width: "100%" }}>
            No activities yet
          </h2>
        </div>
      )
    )
  }, [refresh, activeTodo, todoList])

  return (
    <div
      className={`home-container ${
        activeTodo !== null && activeTodo !== -1 ? "show-preview" : ""
      }`}
    >
      <div className="todo-list">
        <div className="todo-header">
          <LiaNewspaperSolid style={{ zIndex: 2 }} />
          <h1 className="title" style={{ zIndex: 2 }}>
            To Do List
          </h1>
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
              zIndex: 2,
            }}
          >
            <FaPlus color={Colors.blue} size={20} />
          </button>
        </div>
        <div id="todo-list-container">{todoListContent}</div>

        <div
          style={{
            position: "absolute",
            left: -230,
            top: 50,
            width: 350,
            height: 350,
            borderRadius: "50%",
            backgroundColor: Colors.lapiz,
            zIndex: 0,
            filter: "blur(50px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -250,
            top: 30,
            width: 500,
            height: 500,
            borderRadius: "50%",
            zIndex: 0,
            filter: "blur(50px)",
            background: "rgba(255, 255, 255, 0.15)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -20,
            top: -50,
            width: 300,
            height: 300,
            borderRadius: "50%",
            zIndex: 0,
            filter: "blur(50px)",
            background: "rgba(255, 255, 255, 0.15)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -20,
            top: -100,
            width: 250,
            height: 250,
            borderRadius: "50%",
            backgroundColor: Colors.lightBlue,
            zIndex: 0,
            filter: "blur(50px)",
          }}
        />
      </div>

      <div className="todo-preview">
        {todoList.length > 0 && activeTodo !== null ? (
          <div className="todo-activities">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: ".2rem",
                zIndex: 2,
              }}
            >
              <div className="todo-header">
                {isSmallScreen && (
                  <button
                    onClick={() => setActiveTodo(null)}
                    className="close-preview-btn"
                    aria-label="Close Preview"
                    style={{
                      alignSelf: "center",
                      justifySelf: "center",
                      background: "transparent",
                      border: "none",
                      paddingLeft: 0,
                    }}
                  >
                    <FaArrowLeft size={20} color="black" />
                  </button>
                )}

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
                      <FaStar color="gold" size={20} />
                    ) : (
                      <FaRegStar color="gold" size={20} />
                    )}
                  </button>
                  <button className="delete-btn" onClick={removeTodo}>
                    <FaTrash color={"darkred"} size={17} />
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
                zIndex: 2,
              }}
              onkeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  const value = e.target.value
                  if (!value.trim()) return false
                  handleAddActivity(value)
                  e.target.value = ""
                  return true
                }
                return false
              }}
              action={{
                label: "Add",
                onClick: (value) => {
                  if (!value.trim()) return
                  handleAddActivity(value)
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
              zIndex: 2,
            }}
          >
            <LuListTodo size={100} color="gray" />
            <h2 style={{ textAlign: "center", color: "gray", width: "100%" }}>
              No To Do Selected
            </h2>
          </div>
        )}

        <div
          style={{
            position: "absolute",
            right: -150,
            bottom: -150,
            width: 400,
            height: 400,
            borderRadius: "50%",
            backgroundColor: Colors.lapiz,
            zIndex: 0,
            filter: "blur(50px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -150,
            bottom: -180,
            width: 550,
            height: 550,
            borderRadius: "50%",
            zIndex: 0,
            filter: "blur(50px)",
            background: "rgba(255, 255, 255, 0.15)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 90,
            bottom: -200,
            width: 350,
            height: 350,
            borderRadius: "50%",
            zIndex: 0,
            filter: "blur(50px)",
            background: "rgba(255, 255, 255, 0.15)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 80,
            bottom: -160,
            width: 300,
            height: 300,
            borderRadius: "50%",
            backgroundColor: Colors.lightBlue,
            zIndex: 0,
            filter: "blur(50px)",
          }}
        />
      </div>
    </div>
  )
}
