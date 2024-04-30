"use client"
import { DeleteUser, getUserById, updateUser } from "@/app/lib/controllers/usuarioController";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function EditUser({ params }: { params: { id: number } }) {
    const [dadosUsuario, setdadosUsuario] = useState({ nome: "", email:"" });
    const route = useRouter();

    const setdados = async () => {
        const usuario = await getUserById(params.id);
        setdadosUsuario(usuario);
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await updateUser(dadosUsuario.nome, dadosUsuario.email, params.id)
        route.push("/users");

    }

    const handleDelete = async () => {
        await DeleteUser(params.id);
        route.push("/users")
    }


    useEffect(() => {
        setdados();
    },[])

    console.log(dadosUsuario.nome)
    return (
        <>
            <form onSubmit={handleSubmit} className="text-black">
                <input type="text" value={dadosUsuario.nome} onChange={(e) => setdadosUsuario(prevState => ({ ...prevState, nome: e.target.value }))} />
                <input type="text" value={dadosUsuario.email} onChange={(e) => setdadosUsuario(prevState => ({ ...prevState, email: e.target.value }))} />
                <div className="flex gap-5 text-white">
                    <button type="submit">Editar</button>
                    <button type="button" onClick={handleDelete}>Deletar</button>
                </div>
            </form>

        </>
    )
}