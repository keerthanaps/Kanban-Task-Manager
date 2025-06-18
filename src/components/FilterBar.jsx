import React from "react";
import useBoardStore from "../store/useBoardStore";

const FilterBar = () => {
  const tagFilter = useBoardStore((state) => state.tagFilter);
  const setTagFilter = useBoardStore((state) => state.setTagFilter);
  const searchQuery = useBoardStore((state) => state.searchQuery);
  const setSearchQuery = useBoardStore((state) => state.setSearchQuery);

  return (
    <div className="flex flex-wrap items-center gap-4 mb-4 px-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search tasks..."
        className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white"
      />

      <select
        value={tagFilter || ""}
        onChange={(e) => setTagFilter(e.target.value || null)}
        className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white"
      >
        <option value="">All Tags</option>
        <option value="urgent">Urgent</option>
        <option value="bug">Bug</option>
        <option value="feature">Feature</option>
        {/* Add more if needed */}
      </select>
    </div>
  );
};

export default FilterBar;
