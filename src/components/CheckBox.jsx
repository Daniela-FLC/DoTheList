import { useState } from "react"
import "./Checkbox.css"

export default function Checkbox({ label, checked, onChange }) {
  const [isChecked, setIsChecked] = useState(checked || false)

  const handleChange = (e) => {
    const value = e.target.checked
    setIsChecked(value)
    onChange?.(value)
  }

  return (
    <label className="checkbox-container">
      <input type="checkbox" checked={isChecked} onChange={handleChange} />
      <span className="checkmark" />
      {label && <span className="checkbox-label">{label}</span>}
    </label>
  )
}
