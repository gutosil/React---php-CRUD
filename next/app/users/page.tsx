"use client"
import { getAllUsers } from "@/app/lib/controllers/usuarioController";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


type usuariosType = {
    id: number,
    nome: string,
    email: string
}

export default function Home() {
    const rota = useRouter();
    const [usuarios, setUsuarios] = useState<usuariosType[]>([]);

    const Setdata = async () => {
        const users = await getAllUsers();
        setUsuarios(users);
    }



    const handleEdit = (id: number) => {
        rota.push(`/users/${id}`)
    }

    useEffect(() => {
        Setdata();
    }, [])

    return (
        <>
            <div className="flex flex-col gap-5">
                <button onClick={() => rota.push("/users/Cadastrar")}>Cadastrar</button>
                {usuarios.map((user, indice) => (
                    <div className="flex gap-5 spac" key={indice}>
                        <h2>{user.id}</h2>
                        <p>Nome: {user.nome}</p>
                        <p>Email: {user.email}</p>
                        <button className="bg-sky-500 hover:bg-sky-700 text-white rounded-md" onClick={() => handleEdit(user.id)}>Editar</button>
                    </div>
                ))}
            </div>
        </>
    )
}