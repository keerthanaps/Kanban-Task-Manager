// components/SortableTask.js
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableTask = ({ id, title }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    backgroundColor: isDragging ? "#93c5fd" : "#bfdbfe", // blue shades
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "8px",
    cursor: "grab",
    userSelect: "none",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {title}
    </div>
  );
};

export default SortableTask;
