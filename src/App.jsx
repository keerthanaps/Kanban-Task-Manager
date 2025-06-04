import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Board from "./components/Board";
import AddTask from "./components/AddTask";

function App() {
  return (
    <div className="min-h-screen w-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      
      <main className="flex-grow py-6 px-4 flex justify-center">
        <div className="w-full sm:max-w-xl md:max-w-4xl flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4 text-center">Kanban Task Manager</h1>
          <AddTask columnId="todo" />
          <Board />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
