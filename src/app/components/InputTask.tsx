'use client'
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

interface Task {
    id: number;
    titulo: string;
}

export default function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        fetch('http://localhost:8082/task')
            .then(response => response.json())
            .then(data => setTasks(data));
    }, []);

    const createTask = async () => {
        const response = await fetch('http://localhost:8082/task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ titulo: title }),
        });

        const newTask: Task = await response.json();
        setTasks([...tasks, newTask]);
    };

    return (
        <div>
            <h2 className='text-center text-2xl font-bold mb-6 p-2'>Minhas Tasks</h2>
            <div className="flex flex-row gap-6 justify-center">
            <input
                className="w-80 h-10 p-1 text-sm rounded border-gray-900 border-2 outline-black"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Titulo da task"
            />
            <button className="py-2 px-4 text-sm text-white rounded-lg bg-indigo-500 hover:bg-indigo-400 transition duration-200" 
            onClick={createTask}>Criar Task</button>
            </div>
            <ul className='flex flex-col justify-center items-center mt-10'>
                {tasks.map(task => (
                    <li key={task.id} onClick={() => router.push('/'+task.id)}>{task.titulo}</li>
                ))}
            </ul>
        </div>
    );
}