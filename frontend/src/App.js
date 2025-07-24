import {useEffect, useState} from "react";
import './App.css';
import TaskItem from './components/TaskItem';
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/tasks/`)
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error("Erreur de chargement :", error));
  }, []);

  const handleAddTask = (newTask) => {
    setTasks(perv => [...perv,newTask]);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(perv => perv.map(t => (t.id === updatedTask.id ? updatedTask : t)));
  };

  const handleDeleteTask = (id) => {
    setTasks(perv => perv.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 to-blue-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600 drop-shadow1">Ma ToDo List</h1>

      <TaskForm onAdd={handleAddTask}/>

      <div className="space-y-4 max-w-xl mx-auto">
        {tasks.length === 0 ? (
          <p className="text-gray-600 text-center italic">Aucune tâche pour le moment.</p>
        ) : (
          tasks.map(task => (
            <TaskItem
            key={task.id}
            task={task}
            onUpdate={handleUpdateTask}
            onDelete={handleDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
