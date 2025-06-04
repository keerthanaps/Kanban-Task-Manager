import { create } from "zustand";
import { nanoid } from "nanoid";

const useBoardStore = create((set) => ({
  // 🔹 All tasks stored here
  tasks: {},

  // 🔹 Columns with associated task IDs
  columns: {
    todo: {
      id: "todo",
      title: "To Do",
      taskIds: [],
    },
    inprogress: {
      id: "inprogress",
      title: "In Progress",
      taskIds: [],
    },
    done: {
      id: "done",
      title: "Done",
      taskIds: [],
    },
  },

  // ✅ Add Task with Priority
  addTask: (columnId, title, priority = "medium") => {
    const id = nanoid();
    const newTask = { id, title, priority };

    set((state) => {
      const column = state.columns[columnId];

      if (!column) {
        console.error(`❌ Invalid columnId: ${columnId}`);
        return state; // Prevent crash
      }

      return {
        tasks: {
          ...state.tasks,
          [id]: newTask,
        },
        columns: {
          ...state.columns,
          [columnId]: {
            ...column,
            taskIds: [id, ...column.taskIds],
          },
        },
      };
    });
  },

  // ✅ Move Task across or within columns
  moveTask: (taskId, sourceColumnId, targetColumnId, targetIndex) => {
    set((state) => {
      const sourceTaskIds = [...state.columns[sourceColumnId].taskIds];
      const targetTaskIds = [...state.columns[targetColumnId].taskIds];

      // Remove task from source column
      const fromIndex = sourceTaskIds.indexOf(taskId);
      if (fromIndex > -1) {
        sourceTaskIds.splice(fromIndex, 1);
      }

      // Insert task into target column
      if (targetIndex >= 0) {
        targetTaskIds.splice(targetIndex, 0, taskId);
      } else {
        targetTaskIds.push(taskId);
      }

      return {
        columns: {
          ...state.columns,
          [sourceColumnId]: {
            ...state.columns[sourceColumnId],
            taskIds: sourceTaskIds,
          },
          [targetColumnId]: {
            ...state.columns[targetColumnId],
            taskIds: targetTaskIds,
          },
        },
      };
    });
  },
}));

export default useBoardStore;
