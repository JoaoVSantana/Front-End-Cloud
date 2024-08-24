'use client'
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { createTask, fetchTasks } from '../api';
import React from 'react';

interface Task {
    id: number;
    titulo: string;
}

export default function InputTask() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [titulo, settitulo] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        fetchTasks()
            .then(data => setTasks(data));
    }, []);

    const handleCreateTask = async () => {
        try {
            const newTask = await createTask(titulo);
            setTasks([...tasks, newTask]);
        } catch (error) {
            console.error('Erro ao criar a task:', error);
        }
    };

    return (
        <div>
            <h2 className='text-center text-2xl font-bold mb-6 p-2'>Minhas Tasks</h2>
            <div className="flex flex-row gap-6 justify-center">
                <input
                    className="w-80 h-10 p-1 text-sm rounded border-gray-900 border-2 outline-black"
                    type="text"
                    value={titulo}
                    onChange={(e) => settitulo(e.target.value)}
                    placeholder="Titulo da task"
                />
                <button className="py-2 px-4 text-sm text-white rounded-lg bg-indigo-500 hover:bg-indigo-400 transition duration-200"
                    onClick={handleCreateTask}>Criar Task</button>
            </div>
            <ul className='flex flex-col justify-center items-center mt-10'>
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <li key={task.id} onClick={() => router.push('/' + task.id)}>{task.titulo}</li>
                    ))
                ) : (
                    <p>Nenhuma task encontrada</p>
                )}
            </ul>

        </div>
    );
}