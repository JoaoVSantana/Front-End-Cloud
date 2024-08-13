'use client'
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function UploadFile() {
    const [file, setFile] = useState<File | null>(null);
    const [images, setImages] = useState<string[]>([]);
    const router = useRouter();

    const id = useParams<{taskId : string}>()
    console.log(id)

    useEffect(() => {
            fetch(`http://localhost:8082/aws/imagens/${id.taskId}`)
                .then(response => response.json())
                .then(data => setImages(data))
                .catch(error => console.error('Erro ao carregar as imagens:', error));
    }, [id.taskId]);  

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!file) {
            alert('Selecione uma imagem');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`http://localhost:8082/aws/${id.taskId}`, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            alert('Imagem enviada com sucesso');
            // Recarrega as imagens após o upload bem-sucedido
            fetch(`http://localhost:8082/aws/imagens/${id.taskId}`)
                .then(response => response.json())
                .then(data => setImages(data))
                .catch(error => console.error('Erro ao carregar as imagens:', error));
        } else {
            alert('Erro ao enviar a imagem');
        }
    };

    return (
        <div>
            <h2 className='text-center text-2xl font-bold mb-6 p-2'>Enviar Imagens</h2>
            <div className="flex flex-row gap-6 justify-center">
                <button className='py-2 px-4 text-sm text-white rounded-lg bg-indigo-500 hover:bg-indigo-400 transition duration-200' onClick={router.back}>Voltar</button>
                <input className="p-1 bg-gray-400 rounded-md" type="file" onChange={handleFileChange} />
                <button className='py-2 px-4 text-sm text-white rounded-lg bg-indigo-500 hover:bg-indigo-400 transition duration-200' onClick={handleSubmit}>Enviar</button>
            </div>
            <div className='flex flex-col gap-6 mt-10 items-center'>
                {images.length > 0 ? (
                    images.map((url, index) => (
                        <div className=' w-40' key={index}>
                            <img src={url} alt={`Image ${index + 1}`} />
                        </div>
                    ))
                ) : (
                    <p className='text-center mt-6 p-2'>Nenhuma imagem encontrada para esta task.</p>
                )}
            </div>
        </div>
    );
}
