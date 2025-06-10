// components/AddTask.jsx
import React, { useState } from "react";
import useBoardStore from "../store/useBoardStore";

function AddTask({ columnId }) {
  const [task, setTask] = useState("");
  const addTask = useBoardStore((state) => state.addTask);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === "") return;
    addTask(columnId, task.trim());
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-center gap-2 mb-6 bg-white dark:bg-gray-700 text-black dark:text-white ">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter new task..."
        className="border rounded px-3 py-2 w-64"
      />
      <button
        type="submit"
        className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700"
      >
        Add
      </button>
    </form>
  );
}

export default AddTask;
