import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ListUser() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost/React/Backend/index.php?acao=CreateUser',
            {
                method: "POST",
                body: JSON.stringify(inputs)
            }).then(response => response.json())
            .then(data => console.log(data), navigate("/"))
            .catch(error => console.error('Erro ao cadastrar usuario:', error));

    }
    return (
        <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
                <h1>Create user</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Name</label>
                        <input type="text" className="form-control" name="nome" onChange={handleChange} />
                    </div>
                    <button type="submit" name="add" className="btn btn-primary">Save</button>
                </form>
            </div>
            <div className="col-2"></div>
        </div>
    )
}