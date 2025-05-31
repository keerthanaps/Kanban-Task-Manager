// App.jsx
import React from "react";
import Board from "./components/Board";
import AddTask from "./components/AddTask";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Kanban Task Manager</h1>
      <AddTask columnId="todo" />
      <Board />
    </div>
  );
}

export default App;
