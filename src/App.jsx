import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Users from "./users/pages/Users";
import PlacesList from "./places/pages/PlacesList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Users />} />
        <Route path="/places/list" exact element={<PlacesList />} />

        <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>
    </Router>
  );
}

export default App;
