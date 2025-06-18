import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import useBoardStore from "../store/useBoardStore";
import { Trash2 } from "lucide-react";
import dayjs from "dayjs"; // 📦 install if not already: npm i dayjs

const SortableTask = ({ id }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const deleteTask = useBoardStore((state) => state.deleteTask);
  const task = useBoardStore((state) => state.tasks[id.split(":")[1]]);
  const [columnId, taskId] = id.split(":");

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleDelete = () => {
    const confirm = window.confirm("Delete this task?");
    if (confirm) deleteTask(columnId, taskId);
  };

  // 🛡️ Prevent render crash if task is already deleted
  if (!task) return null;

  // 🔍 Determine urgency color
  const getDueColor = (dueDate) => {
    if (!dueDate) return null;
    const today = dayjs().startOf("day");
    const due = dayjs(dueDate).startOf("day");

    if (due.isBefore(today)) return "bg-red-500";      // Overdue
    if (due.isSame(today)) return "bg-yellow-500";     // Today
    return "bg-green-500";                             // Future
  };

  const dueColorClass = getDueColor(task.dueDate);

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className="bg-gray-100 dark:bg-gray-600 text-black dark:text-white rounded-lg p-3 shadow mb-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      layout
      {...attributes}
      {...listeners}
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <span className="font-medium">{task.title}</span>

          {task.tag && (
            <span
              className="text-xs font-semibold inline-block px-2 py-1 rounded"
              style={{
                backgroundColor: task.tagColor || "#6366f1",
                color: "white",
                width: "fit-content",
              }}
            >
              {task.tag}
            </span>
          )}

          {task.dueDate && (
            <span
              className={`text-xs font-medium text-white px-2 py-1 rounded w-fit ${dueColorClass}`}
            >
              Due: {dayjs(task.dueDate).format("MMM D")}
            </span>
          )}
        </div>

        <Trash2
          size={16}
          className="cursor-pointer dark:text-red-200 text-red-500 opacity-70 hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        />
      </div>
    </motion.div>
  );
};

export default SortableTask;
