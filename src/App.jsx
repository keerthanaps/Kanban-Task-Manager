import React from "react";
import Board from "./components/Board";
import AddTask from "./components/AddTask";

function App() {
  return (
    <div className="min-h-screen w-screen bg-gray-100">
      <div className="min-h-screen bg-gray-100 py-6 px-4 flex justify-center">
        <div className="w-full sm:max-w-xl md:max-w-4xl flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4 text-center">Kanban Task Manager</h1>
          <AddTask columnId="todo" />
          <Board />
        </div>
      </div>
    </div>
  );
}

export default App;
