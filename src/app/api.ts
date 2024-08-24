"use server"

const apiUrl = "http://springboot-demo:8088/"

export const fetchTasks = async () => {
    console.log("eu tentei")
    const response = await fetch(apiUrl + 'task');
    console.log("eu tentei dnv")
    if (!response.ok) {
        throw new Error('Erro ao carregar as tasks');
    }
    const data = await response.json();
    return data;
};

export const createTask = async (titulo: string) => {
    const response = await fetch(apiUrl + 'task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titulo: titulo }),
    });

    if (!response.ok) {
        throw new Error('Erro ao criar a task');
    }

    const newTask = await response.json();
    return newTask;
};

export const fetchImages = async (taskId: string) => {
    const response = await fetch(apiUrl + `aws/imagens/${taskId}`);
    if (!response.ok) {
        throw new Error('Erro ao carregar as imagens');
    }
    const data = await response.json();
    return data;
};

export const uploadImage = async (taskId: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(apiUrl + `aws/${taskId}`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Erro ao enviar a imagem');
    }

    return response;
};