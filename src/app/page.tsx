import Image from "next/image";
import Tasks from "./components/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h2 className="text-center text-2xl font-bold mb-6 p-2">Minhas Tasks</h2>
        <div className="flex flex-row gap-6 justify-center">
          <input className="w-80 h-10 p-1 text-sm rounded border-gray-900 border-2 outline-black " type="text" placeholder="Digite o nome da task" />
          <button className="py-2 px-4 text-sm text-white rounded-lg bg-indigo-500 hover:bg-indigo-400 transition duration-200">Enviar</button>
        </div>
        
      </div>
    </main>
  );
}
