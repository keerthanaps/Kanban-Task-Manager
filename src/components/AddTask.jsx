import { useState } from "react";
import useBoardStore from "../store/useBoardStore";

const AddTask = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const addTask = useBoardStore((state) => state.addTask);

  const handleAdd = () => {
    if (taskTitle.trim() === "") return;
    addTask("todo", { title: taskTitle });
    setTaskTitle("");
  };

  return (
    <div className="flex gap-2 mb-6 justify-center">
      <input
        type="text"
        placeholder="Enter new task..."
        className="p-2 rounded border border-gray-300 w-2/3"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />
      <button
        onClick={handleAdd}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add
      </button>
    </div>
  );
};

export default AddTask;
