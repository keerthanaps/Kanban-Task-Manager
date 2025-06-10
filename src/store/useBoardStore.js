import { create } from "zustand";
import { nanoid } from "nanoid";

const useBoardStore = create((set) => ({
  tasks: {},
  columns: {
    todo: { id: "todo", title: "To Do", taskIds: [] },
    inprogress: { id: "inprogress", title: "In Progress", taskIds: [] },
    done: { id: "done", title: "Done", taskIds: [] },
  },

  addTask: (columnId, title, priority = "medium") => {
  const id = nanoid();
  const newTask = { id, title, priority };

  set((state) => {
    const column = state.columns[columnId];
    if (!column) {
      console.error(`❌ Invalid columnId: ${columnId}`);
      return state;
    }

    return {
      tasks: {
        ...state.tasks,
        [id]: newTask, // ✅ Store the new task
      },
      columns: {
        ...state.columns,
        [columnId]: {
          ...column,
          taskIds: [id, ...column.taskIds], // ✅ Add task ID to column
        },
      },
    };
  });
},


  moveTask: (taskId, sourceColumnId, targetColumnId, targetIndex) => {
    set((state) => {
      const sourceTaskIds = [...state.columns[sourceColumnId].taskIds];
      const targetTaskIds = [...state.columns[targetColumnId].taskIds];

      const fromIndex = sourceTaskIds.indexOf(taskId);
      if (fromIndex > -1) {
        sourceTaskIds.splice(fromIndex, 1);
      }

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
