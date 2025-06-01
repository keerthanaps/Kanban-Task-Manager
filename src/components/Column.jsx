// components/Column.js
import React from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import useBoardStore from "../store/useBoardStore";
import SortableTask from "./SortableTask";
import DroppableColumn from "./DroppableColumn";
import { AnimatePresence } from "framer-motion";
import { motion } from 'framer-motion';


const Column = ({ column }) => {
  const tasks = useBoardStore((state) => state.tasks);

  return (
<DroppableColumn columnId={column.id}>
<motion.div
  className="bg-white rounded-xl shadow p-4 min-h-[200px] flex-1 mb-4 md:mb-0"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}>
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
      <AnimatePresence>
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
      </AnimatePresence>
    </SortableContext>
  </motion.div>
</DroppableColumn>


  );
};

export default Column;
