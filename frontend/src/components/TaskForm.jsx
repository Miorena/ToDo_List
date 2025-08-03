import { useState } from "react";

function TaskForm({onAdd}) {
    const [title, setTitle] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!title.trim()) {
            console.warn("Champ vide");
            return;
        }

        console.log("Envoi vers le backend: ", title);

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/tasks/`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({title, is_completed: false})
            });

            if(response.ok) {
                const newTask = await response.json();
                onAdd(newTask);
                setTitle("");
            } else {
                console.error("Erreur lors de l'ajout")
            }
        } catch (err) {
            console.error("ERREUR réseau", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 max-w-xl mx-auto flex gap-2">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nouvelle tâche..."
                className="flex-1 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
                Ajouter
            </button>
        </form>
    );
}

export default TaskForm;