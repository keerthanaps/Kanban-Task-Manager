// components/Board.js
import React from "react";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import useBoardStore from "../store/useBoardStore";
import Column from "./Column";

const Board = () => {
  const columns = useBoardStore((state) => state.columns);
  const moveTask = useBoardStore((state) => state.moveTask);

  const sensors = useSensors(useSensor(PointerSensor));

  const onDragEnd = (event) => {
  const { active, over } = event;
  if (!over) return;

  const [sourceColumnId, sourceTaskId] = active.id.split(":");

  let targetColumnId, targetTaskId;

  if (over.id.includes(":")) {
    // Dropped on another task
    [targetColumnId, targetTaskId] = over.id.split(":");
  } else {
    // Dropped on empty column
    targetColumnId = over.id;
    targetTaskId = null;
  }

  if (active.id === over.id) return;

  const targetColumn = columns[targetColumnId];
  const targetIndex = targetTaskId
    ? targetColumn.taskIds.indexOf(targetTaskId)
    : 0;

  moveTask(sourceTaskId, sourceColumnId, targetColumnId, targetIndex);
};

  return (
   <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
<div className="flex flex-col md:flex-row gap-4 w-full px-2 md:px-6 py-4 md:max-w-screen-xl md:mx-auto">
    {Object.values(columns).map((column) => (
      <div key={column.id} className="flex-1 min-w-0">
        <Column column={column} />
      </div>
    ))}
  </div>
</DndContext>


  );
};


export default Board;
