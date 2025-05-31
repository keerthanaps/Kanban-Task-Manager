import React from "react";
import { useDroppable } from "@dnd-kit/core";

export default function DroppableColumn({ columnId, children }) {
  const { setNodeRef } = useDroppable({
    id: columnId,  // column id becomes a drop target
  });

  return (
    <div ref={setNodeRef}>
      {children}
    </div>
  );
}
