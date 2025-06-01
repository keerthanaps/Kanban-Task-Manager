// components/SortableTask.js
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from 'framer-motion';


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
  backgroundColor: isDragging ? "#93c5fd" : "#bfdbfe",
  padding: "12px",
  borderRadius: "8px",
  marginBottom: "8px",
  cursor: "grab",
  userSelect: "none",
  wordBreak: "break-word",
};


  return (
  <motion.div
    ref={setNodeRef}
    style={style}
    {...attributes}
    {...listeners}
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.2 }}
  >
    {title}
  </motion.div>
);

};

export default SortableTask;
