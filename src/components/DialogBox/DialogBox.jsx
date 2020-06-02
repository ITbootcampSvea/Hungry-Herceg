import "./DialogBox.css"
import React from 'react'


export default function DialogBox({onYes, onNo, title, message}){


    return(
        <div className="loader">
            <label>{title}</label>
            <label>{message}</label>
            <button onClick={onYes}>Yes</button>
            <button onClick={onNo}>No</button>
        </div>
    )
}
