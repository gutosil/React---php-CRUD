"use client"

import { createNewUser } from "@/app/lib/controllers/usuarioController";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function CadastrarUsuario() {
    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const route = useRouter();

    async function handleSubmit() {
        const resposta = await createNewUser(nome, email)
        route.push("/users")
    }

    return (
        <>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} >
                <input type="text" placeholder="Nome" className="text-black" onChange={(e) => setNome(e.target.value)} />
                <input type="text" placeholder="email" className="text-black" onChange={(e) => setEmail(e.target.value)} />

                <button>Cadastrar</button>
            </form>
        </>
    )
}

