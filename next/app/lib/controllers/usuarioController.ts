

export async function  getAllUsers() {
    const response = await fetch("http://localhost/React/Backend/api/service/user.php?acao=GetAllUsers");
    const dados = await response.json();
    console.log(dados);
    return dados;
}

export async function getUserById(userId:number) {
    const response = await fetch(`http://localhost/React/Backend/api/service/user.php?acao=GetUserById&id=${userId}`);
    const dados = await response.json();
    console.log(dados);
    return dados;
}

export async function createNewUser(newNome: string, newEmail: string) {
    const request = await fetch("http://localhost/React/Backend/api/service/user.php?acao=CreateUser",
        {
            method: "POST",
            body: JSON.stringify({ nome: newNome, email: newEmail })
        });

    const response = await request.json();
    console.log(response)

    return response.message
}

export async function updateUser(newNome: string, newEmail:string, paramsId:Number) {
    const request = await fetch(`http://localhost/React/Backend/api/service/user.php?acao=UpdateUserById&id=${paramsId}`,
        {
            method: "POST",
            body: JSON.stringify({ nome: newNome, email: newEmail})
        });

    const response = await request.json();
    console.log(response)

    return response.message
}

export async function DeleteUser(paramsId:number) {
    const request = await fetch(`http://localhost/React/Backend/api/service/user.php?acao=DeleteUserById&id=${paramsId}`);
    const response = await request.json();
    console.log(response)

    return response.message
}
