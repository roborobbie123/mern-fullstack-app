import React, { useRef } from "react";
import ReactDOM from "react-dom";

import Backdrop from "./Navigation/Backdrop";
import { CSSTransition } from "react-transition-group";
import "./Modal.css";

function ModalOverlay({ header, onSubmit, children, footer, nodeRef }) {
  const content = (
    <div className="flex justify-center">
      <div
        className="h-2/3 border fixed w-1/2 z-100 bg-white rounded-md mt-30 flex flex-col"
        ref={nodeRef}
      >
        <header className="bg-purple-800 p-2 text-white text-center md:text-xl text-sm font-semibold">
          <h2>{header}</h2>
        </header>
        <div className="flex-grow">
          <form
            className='h-full' onSubmit={onSubmit ? onSubmit : (event) => event.preventDefault()}
          >
            <div className="w-full h-19/20">{children}</div>
          </form>
        </div>
        <div className='flex justify-end pr-2 mb-2'>
          <footer>
            {footer}
          </footer>
        </div>
      </div>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
}

export default function Modal({ show, onCancel, ...props }) {
  const nodeRef = useRef(null);
  return (
    <>
      {show && <Backdrop onClick={onCancel}></Backdrop>}
      <CSSTransition
        in={show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        nodeRef={nodeRef}
        classNames='modal'
      >
        <ModalOverlay {...props} nodeRef={nodeRef} />
      </CSSTransition>
    </>
  );
}
