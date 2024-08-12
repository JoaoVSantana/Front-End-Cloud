'use client'
import { useState, useEffect } from 'react';

interface Task {
    id: number;
    titulo: string;
}

export default function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState<string>("");

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
            <h1>Tasks</h1>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
            />
            <button onClick={createTask}>Create Task</button>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task.titulo}</li>
                ))}
            </ul>
        </div>
    );
}