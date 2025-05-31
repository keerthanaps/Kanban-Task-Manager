// components/Column.js
import React from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import useBoardStore from "../store/useBoardStore";
import SortableTask from "./SortableTask";
import DroppableColumn from "./DroppableColumn";

const Column = ({ column }) => {
  const tasks = useBoardStore((state) => state.tasks);

  return (
<DroppableColumn columnId={column.id}>
  <div key={column.id} className="bg-white rounded-xl shadow p-4 min-h-[200px]">
    <h2 className="text-xl font-semibold mb-4">{column.title}</h2>
    <SortableContext
      items={column.taskIds.map((taskId) => `${column.id}:${taskId}`)}
      strategy={verticalListSortingStrategy}
    >
      {column.taskIds.length === 0 && (
        <div
          className="p-4 border-2 border-dashed border-blue-300 rounded-lg text-center text-blue-400"
          style={{ minHeight: "80px" }}
        >
          Drop here
        </div>
      )}
      {column.taskIds.map((taskId) => {
        const task = tasks[taskId];
        if (!task) return null;
        return (
          <SortableTask
            key={`${column.id}:${task.id}`}
            id={`${column.id}:${task.id}`}
            title={task.title}
          />
        );
      })}
    </SortableContext>
  </div>
</DroppableColumn>


  );
};

export default Column;
