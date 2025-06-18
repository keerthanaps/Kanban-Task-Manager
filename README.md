
# 🧠 Kanban Task Manager

A **drag-and-drop task management web app** built with **React**, **Zustand**, and **@dnd-kit**, with support for **dark mode**, **PWA installability**, **localStorage persistence**, **due date indicators**, and **tag-based task categorization**.

## 🔥 Live Demo  
[Click here to try the live version](#) <!-- Replace with your deployed URL -->

## 📸 Screenshots

| Light Mode | Dark Mode | Mobile Responsive |
|------------|-----------|-------------------|
| ![light](#) | ![dark](#) | ![mobile](#) | <!-- Optional: Add image links -->

## 🚀 Features

✅ **Drag and Drop** – Smooth DnD using `@dnd-kit`  
✅ **LocalStorage Sync** – Tasks persist on reload  
✅ **Add/Delete Tasks** – Manage tasks in multiple columns  
✅ **Tags + Color Labels** – Add contextual color-coded tags  
✅ **Due Dates + Urgency Indicators** – Colored badges (🔴 Overdue, 🟡 Today, 🟢 Upcoming)  
✅ **Dark Mode Toggle** – Switch themes (persists using `localStorage`)  
✅ **Responsive Design** – Works well on mobile & desktop  
✅ **PWA Support** – Installable like a native app  
✅ **Task Search & Tag Filter** – Quickly find or group tasks (if implemented)

## 🛠️ Tech Stack

- **Frontend**: React + Tailwind CSS + Framer Motion  
- **State Management**: Zustand  
- **Drag and Drop**: @dnd-kit  
- **PWA**: Vite + `vite-plugin-pwa`  
- **Icons**: Lucide React  

## 🧩 Folder Structure (Simplified)
```
src/
├── components/
│   ├── AddTask.jsx
│   ├── Board.jsx
│   ├── Column.jsx
│   ├── DroppableColumn.jsx
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── SortableTask.jsx
├── store/
│   └── useBoardStore.js
├── App.jsx
└── main.jsx
```

## 🖥️ Setup Instructions

```bash
# Clone the repo
git clone https://github.com/yourusername/kanban-task-manager.git
cd kanban-task-manager

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📦 Build & Deploy

```bash
npm run build
```

You can deploy the `dist/` folder to:
- **Netlify**
- **Vercel**
- **GitHub Pages**
- **Firebase Hosting**

> ⚙️ PWA support is auto-configured via `vite-plugin-pwa`.

## 🧠 What I Learned

- Efficient state management using Zustand  
- Building accessible drag-and-drop UIs with @dnd-kit  
- Creating responsive and theme-aware UIs with Tailwind  
- Implementing a Progressive Web App (PWA)  
- Designing with UX in mind using urgency indicators and color-coded tags  

## 📌 Future Enhancements

- 🧠 Task editing functionality  
- 🗂 Tag-based filters and live search  
- 📊 Productivity analytics (time per task, completed tasks graph)  
- 🔔 Reminder notifications (via Notification API or email)