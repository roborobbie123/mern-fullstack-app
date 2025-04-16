import React from "react";
import ReactDOM from 'react-dom';

export default function Backdrop({ onClick }) {
    return ReactDOM.createPortal(
        <div className="bg-black opacity-50 w-screen h-full absolute m-0"
        onClick={onClick}></div>, document.getElementById('backdrop-hook')
    )
}