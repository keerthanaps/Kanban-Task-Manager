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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.values(columns).map((column) => (
          <Column key={column.id} column={column} />
        ))}
      </div>
    </DndContext>
  );
};


export default Board;
