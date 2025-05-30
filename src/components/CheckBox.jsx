import { useState } from "react"
import { Colors } from "../constants"

export default function Checkbox({ label, checked, onChange }) {
  const [isChecked, setIsChecked] = useState(checked || false)

  const handleChange = (e) => {
    const value = e.target.checked
    setIsChecked(value)
    onChange?.(value)
  }

  const styles = {
    container: {
      display: "inline-flex",
      alignItems: "center",
      cursor: "pointer",
      gap: "0.5rem",
      userSelect: "none",
      margin: "0.5rem auto",
    },
    input: {
      display: "none",
    },
    checkmark: {
      width: "1rem",
      height: "1rem",
      border: `2px solid ${Colors.blue}`,
      borderRadius: "0.2rem",
      position: "relative",
      transition: "background-color 0.2s ease",
      backgroundColor: isChecked ? Colors.blue : "transparent",
    },
    checkmarkAfter: {
      content: '""',
      position: "absolute",
      display: isChecked ? "block" : "none",
      left: "0.2rem",
      top: "0rem",
      width: "0.4rem",
      height: "0.6rem",
      border: "solid white",
      borderWidth: "0 0.15rem 0.15rem 0",
      transform: "rotate(45deg)",
    },
    label: {
      color: Colors.blue,
      fontSize: "1rem",
    },
  }

  return (
    <label style={styles.container}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        style={styles.input}
      />
      <span style={styles.checkmark}>
        <span style={styles.checkmarkAfter} />
      </span>
      {label && <span style={styles.label}>{label}</span>}
    </label>
  )
}
