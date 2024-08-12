'use client'
import { useState, ChangeEvent, FormEvent } from 'react';

export default function Upload() {
    const [file, setFile] = useState<File | null>(null);
    const [taskId, setTaskId] = useState<string>("");

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!file) {
            alert('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`http://localhost:8082/aws/${taskId}`, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            alert('File uploaded successfully');
        } else {
            alert('File upload failed');
        }
    };

    return (
        <div>
            <h1 className='text-center text-2xl font-bold mb-6 p-2'>Upload File</h1>
            <div className='flex flex-row gap-6 justify-center'>
            <input
                type="text"
                value={taskId}
                onChange={(e) => setTaskId(e.target.value)}
                placeholder="Task ID"
            />
            <input type="file" onChange={handleFileChange} />
            <button className='className="py-2 px-4 text-sm text-white rounded-lg bg-indigo-500 hover:bg-indigo-400 transition duration-200"' onClick={handleSubmit}>Upload</button>
            </div>
        </div>
    );
}