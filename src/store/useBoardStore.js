import { create } from 'zustand';

const useBoardStore = create((set) => ({
  columns: {
    'todo': {
      id: 'todo',
      title: 'To Do',
      taskIds: [],
    },
    'inprogress': {
      id: 'inprogress',
      title: 'In Progress',
      taskIds: [],
    },
    'done': {
      id: 'done',
      title: 'Done',
      taskIds: [],
    },
  },
  tasks: {},
  addTask: (columnId, task) => {
    const id = crypto.randomUUID();
    set((state) => {
      const updatedTasks = { ...state.tasks, [id]: { id, ...task } };
      const updatedColumn = {
        ...state.columns[columnId],
        taskIds: [...state.columns[columnId].taskIds, id],
      };
      return {
        tasks: updatedTasks,
        columns: {
          ...state.columns,
          [columnId]: updatedColumn,
        },
      };
    });
  },
 moveTask: (taskId, sourceColumnId, targetColumnId, targetIndex) => {
  set((state) => {
    const sourceColumn = state.columns[sourceColumnId];
    const targetColumn = state.columns[targetColumnId];

    let newSourceTaskIds = [...sourceColumn.taskIds];
    let newTargetTaskIds = [...targetColumn.taskIds];

    // Remove task from source
    newSourceTaskIds = newSourceTaskIds.filter((id) => id !== taskId);

    // Adjust target index if same column and task was before the target index
    if (sourceColumnId === targetColumnId) {
      const fromIndex = sourceColumn.taskIds.indexOf(taskId);
      if (fromIndex < targetIndex) {
        targetIndex--; // because we removed the item earlier
      }
      newTargetTaskIds = [...newSourceTaskIds];
    }

    // Insert into target
    newTargetTaskIds.splice(targetIndex, 0, taskId);

    return {
      columns: {
        ...state.columns,
        [sourceColumnId]: {
          ...sourceColumn,
          taskIds: newSourceTaskIds,
        },
        [targetColumnId]: {
          ...targetColumn,
          taskIds: newTargetTaskIds,
        },
      },
    };
  });
}


}));

export default useBoardStore;
