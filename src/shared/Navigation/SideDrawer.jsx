import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import './SideDrawer.css';

export default function SideDrawer({ children, show }) {
    const nodeRef = useRef(null);
  const content = (
    <CSSTransition in={show} classNames='slide-in-left' timeout={200} mountOnEnter unmountOnExit nodeRef={nodeRef}>
      <aside ref={nodeRef}>{children}</aside>
    </CSSTransition>
  );
  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
}
