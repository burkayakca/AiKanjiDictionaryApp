import React from "react"

function XButton(props) {
    return(
    <svg
        width={32}
        height={32}
        onClick={props.onClick}
        viewBox="0 0 16 16"
        className={props.className}
        fill="currentColor"
    >
        <path d="M8 15A7 7 0 118 1a7 7 0 010 14m0 1A8 8 0 108 0a8 8 0 000 16" />
        <path d="M4.646 4.646a.5.5 0 01.708 0L8 7.293l2.646-2.647a.5.5 0 01.708.708L8.707 8l2.647 2.646a.5.5 0 01-.708.708L8 8.707l-2.646 2.647a.5.5 0 01-.708-.708L7.293 8 4.646 5.354a.5.5 0 010-.708" />
    </svg>
)};

export default XButton;