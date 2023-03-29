import React, { useState } from "react";
import './Forms.css'

const Forms = (props) => {

    const [focused, setFocused] = useState(false)
    const handleFocus = (e) => {
        setFocused(true)
    }
    
    const { label, id, handleChange, errorMessage,error, ...inputProps } = props
    return (
        <div className="formInput">
            <label>{label}</label>
            <input {...inputProps} onChange={handleChange} onBlur={handleFocus} focused={focused.toString()} />
            <span className="e1">{errorMessage}</span>
            <span className="e2" style={{display:error[inputProps.name]?"block":"none"}}>{error[inputProps.name]}</span>
        </div>
    )
}

export default Forms