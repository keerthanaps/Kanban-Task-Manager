import React, { useState } from "react";
import useBoardStore from "../store/useBoardStore";

function AddTask({ columnId }) {
  const [task, setTask] = useState("");
  const [tag, setTag] = useState("");
  const [tagColor, setTagColor] = useState("#6366f1"); // Default violet
  const [dueDate, setDueDate] = useState(""); // New state for due date

  const addTask = useBoardStore((state) => state.addTask);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === "") return;
    addTask(columnId, task.trim(), tag.trim(), tagColor, dueDate);
    setTask("");
    setTag("");
    setTagColor("#6366f1");
    setDueDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-center justify-center gap-2 mb-6 bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded"
    >
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task..."
        className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-64 bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
      />
      <input
        type="text"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder="Tag (e.g., Urgent)"
        className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-32 bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
      />
      <input
        type="color"
        value={tagColor}
        onChange={(e) => setTagColor(e.target.value)}
        title="Choose tag color"
        className="w-10 h-10 cursor-pointer"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
      />
      <button
        type="submit"
        className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 transition"
      >
        Add
      </button>
    </form>
  );
}

export default AddTask;
