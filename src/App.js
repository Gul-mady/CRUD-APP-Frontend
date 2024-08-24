// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './pages/UserList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        {/* Add routes for create, edit pages if needed */}
      </Routes>
    </Router>
  );
}

export default App;
