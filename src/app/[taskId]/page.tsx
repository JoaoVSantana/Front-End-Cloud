'use client'
import { useState, useEffect } from 'react';
import { useParams, useRouter } from "next/navigation";

interface File {
    id: number;
    url: string;
}

interface Task {
    id: number;
    titulo: string;
}

export default function TaskDetail() {
    const [task, setTask] = useState<Task | null>(null);
    const [images, setImages] = useState<string[]>([]);
    const router = useRouter();
    const id = useParams

    useEffect(() => {
        if (id) {
            // Buscar a task específica
            fetch(`http://localhost:8080/task/${id}`)
                .then(response => response.json())
                .then(data => setTask(data));

            // Buscar as imagens associadas à task
            fetch(`http://localhost:8080/aws/imagens/${id}`)
                .then(response => response.json())
                .then(data => setImages(data));
        }
    }, [id]);

    if (!task) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{task.titulo}</h1>

            <div>
                <h2>Imagens</h2>
                <div >
                    {images.map((url, index) => (
                        <div key={index}>
                            <img src={url} alt={`Image ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}