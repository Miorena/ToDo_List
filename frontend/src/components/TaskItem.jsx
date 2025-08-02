function TaskItem({task, onUpdate, onDelete}) {
    const toggleComplete = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/tasks/${task.id}/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ is_completed: !task.is_completed})
            });

            if(response.ok) {
                const updatedTask = await response.json();
                onUpdate(updatedTask);
            } else {
                console.error("Erreur lors de la mise à jour");
            }
        } catch (err) {
            console.error("ERREUR réseau", err);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/tasks/${task.id}/delete/`, {
                method: "DELETE"
            });

            if(response.ok || response.status === 204) {
                onDelete(task.id);
            } else {
                console.error("Erreur lors de la suppression");
            }
        } catch (err) {
            console.error("ERREUR réseau", err);
        }
    };

    return (
        <div className={'flex items-center justify-between bg-white p-4 rounded shadow border ${task.is_completed ? "opacity-70" : ""}'}>
            <div className="flex items-center gap-2">
                <input
                type="checkbox"
                checked={task.is_completed}
                onChange={toggleComplete}
                className="w-5 h-5 accent-indigo-600"
                />
                <span className={'text-lg ${task.is_completed ? "line-through text-gray-400" : "text-gray-800"}'}>
                    {task.title}
                </span>
            </div>
            <button
                onClick={handleDelete}
                className="text-red-500 hover:text-red-700 text-sm"
                title="Supprimer"
            >
                ❌
            </button>
        </div>
    );
}

export default TaskItem;