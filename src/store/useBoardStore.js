import { create } from "zustand";

const LOCAL_STORAGE_KEY = "kanban-board-state";

const useBoardStore = create((set, get) => ({
  columns: {
    todo: { id: "todo", title: "To Do", taskIds: [] },
    inProgress: { id: "inProgress", title: "In Progress", taskIds: [] },
    done: { id: "done", title: "Done", taskIds: [] },
  },
  tasks: {},
  tagFilter: null,
  searchQuery: "",

  setTagFilter: (tag) => set({ tagFilter: tag }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  addTask: (columnId, title, tag = "", tagColor = "#6366f1", dueDate = "") => {
    const id = Date.now().toString();
    set((state) => {
      const newTask = { id, title, tag, tagColor, dueDate };
      const column = state.columns[columnId];
      const updatedColumn = {
        ...column,
        taskIds: [...column.taskIds, id],
      };
      const updatedState = {
        ...state,
        tasks: { ...state.tasks, [id]: newTask },
        columns: { ...state.columns, [columnId]: updatedColumn },
      };
      saveState(updatedState);
      return updatedState;
    });
  },

  deleteTask: (columnId, taskId) => {
    set((state) => {
      const updatedTasks = { ...state.tasks };
      delete updatedTasks[taskId];
      const column = state.columns[columnId];
      const updatedColumn = {
        ...column,
        taskIds: column.taskIds.filter((id) => id !== taskId),
      };
      const updatedState = {
        ...state,
        tasks: updatedTasks,
        columns: { ...state.columns, [columnId]: updatedColumn },
      };
      saveState(updatedState);
      return updatedState;
    });
  },

  moveTask: (taskId, fromColumnId, toColumnId, newIndex) => {
    const state = get();
    const fromColumn = state.columns[fromColumnId];
    const toColumn = state.columns[toColumnId];

    if (!fromColumn || !toColumn) {
      console.error("Invalid column ID during moveTask:", {
        fromColumnId,
        toColumnId,
      });
      return;
    }

    const newFromTaskIds = fromColumn.taskIds.filter((id) => id !== taskId);
    const newToTaskIds = [...toColumn.taskIds];
    newToTaskIds.splice(newIndex, 0, taskId);

    const updatedState = {
      ...state,
      columns: {
        ...state.columns,
        [fromColumnId]: { ...fromColumn, taskIds: newFromTaskIds },
        [toColumnId]: { ...toColumn, taskIds: newToTaskIds },
      },
    };

    saveState(updatedState);
    set(updatedState);
  },

  setInitialState: (stateFromStorage) => {
    set(stateFromStorage);
  },
}));

// Load from localStorage if available
const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
if (savedState) {
  try {
    const parsed = JSON.parse(savedState);
    useBoardStore.getState().setInitialState(parsed);
  } catch (e) {
    console.error("Failed to parse saved board state:", e);
  }
}

function saveState(state) {
  const { tasks, columns } = state;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ tasks, columns }));
}

export default useBoardStore;
