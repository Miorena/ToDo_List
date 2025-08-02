import {useState, useEffect} from 'react';

function EditTaskModal({ task, onClose, onSave}) {
    const [title, setTitle] = useState(task.title);
    const [error, setError] = useState("");

    useEffect(() => {
        setTitle(task.title);
    }, [task]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!title.trim()) {
            setError("Le titre ne peut pas être vide");
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/tasks/${task.id}/`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ title })
            });

            if(response.ok) {
                const updatedTask = await response.json();
                onSave(updatedTask);
                onClose();
            } else {
                setError("Erreur lors de la mise à jour");
            }
        } catch (err) {
            console.error("Erreur réseau", err);
            setError("Erreur réseau");
        }
    };

    return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4">Modifier la tâche</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={title}
                onChange={(e) => {
                setTitle(e.target.value);
                setError("");
                }}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex justify-end gap-2">
                <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                >
                Annuler
                </button>
                <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                >
                Enregistrer
                </button>
            </div>
            </form>
        </div>
        </div>
    );
}

export default EditTaskModal;