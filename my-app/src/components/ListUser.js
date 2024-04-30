import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListUser() {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers();
    }, [users]);

    function getUsers() {
        fetch('http://localhost/React/Backend/index.php?acao=GetAllUsers')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Erro ao obter usuários:', error));

    }

    const deleteUser = (myid) => {
        fetch(`http://localhost/React/Backend/index.php?acao=DeleteUser`,
            {
                method: "POST",
                body: JSON.stringify({ id: myid })
            }).then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Erro ao deletar usuario:', error));
    }
    return (
        <div className="row">
            <div className="col-12">
                <h1>List Users</h1>
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, key) =>
                            <tr key={key}>
                                <td>{user.id}</td>
                                <td>{user.nome}</td>
                                <td>
                                    <Link to={`user/${user.id}/edit`} className="btn btn-success" style={{ marginRight: "10px" }}>Edit</Link>
                                    <button onClick={() => deleteUser(user.id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    )
}