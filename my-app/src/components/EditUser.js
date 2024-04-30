import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ListUser() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState([]);

    const { urlId } = useParams();

    useEffect(() => {
        getUser();
    }, []);

    function getUser() {
        fetch(`http://localhost/React/Backend/index.php?acao=GetUserByID?id=${urlId}`)
            .then(response => response.json())
            .then(data => console.log(data) )
            .catch(error => console.error('Erro ao obter usuários pelo id:', error));

    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        fetch(`http://localhost/react/api/${urlId}/edit`,
            {
                method: "PUT",
                body: JSON.stringify(inputs)
            }).then(function (response) {
                console.log(response.data);
                navigate('/');
            });

    }
    return (
        <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
                <h1>Edit user</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Name</label>
                        <input type="text" value={inputs.nome} className="form-control" name="name" onChange={handleChange} />
                    </div>
                    <button type="submit" name="update" className="btn btn-primary">Save</button>
                </form>
            </div>
            <div className="col-2"></div>
        </div>
    )
}