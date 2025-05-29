import { useEffect, useRef, useState } from "react"
import { Colors } from "../constants"

export default function AutoExpandingTextarea({
  value,
  onChange,
  style = {},
  action = {},
  ...props
}) {
  const textareaRef = useRef(null)

  const [onFocus, setOnFocus] = useState(false)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
    }
  }, [value])

  return (
    <div
      className="custom-textarea-container"
      style={{
        width: "100%",
        height: "fit-content",
        display: "flex",
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "space-between",
        // gap: "0.5rem",
        borderRadius: "0.5rem",
        boxSizing: "border-box",
        overflow: "hidden",
        boxShadow: onFocus ? `inset 0 0 0.2rem ${Colors.lightBlue}` : "none",
        ...style,
      }}
    >
      <textarea
        {...props}
        ref={textareaRef}
        value={value}
        onChange={onChange}
        style={{
          resize: "none",
          overflow: "hidden",
          width: "100%",
          fontSize: "1rem",
          lineHeight: 1.2,
          // borderRadius: "0.5rem",
          border: "none",
          padding: "0.5rem",
          boxSizing: "border-box",
          fontFamily: "inherit",
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
        rows={1}
        onFocus={() => setOnFocus(true)}
        onBlur={() => setOnFocus(false)}
      />

      {action && action.onClick && (
        <button
          style={{
            border: "none",
            cursor: "pointer",
            alignSelf: "flex-start",
            padding: "0.6rem 1rem",
            fontSize: ".8rem",
            borderRadius: "0.5rem",
            backgroundColor: Colors.blue,
            outline: "none",
            margin: 0,
          }}
          onClick={() => action.onClick(textareaRef.current.value)}
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
