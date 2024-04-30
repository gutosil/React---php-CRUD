
// import React, { useEffect, useState } from 'react';

// const UserList = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost/React/Backend/index.php') // Altere para o URL correto do seu servidor PHP
//       .then(response => response.json())
//       .then(data => setUsers(data))
//       .catch(error => console.error('Erro ao obter usuários:', error));
//   }, []);

//   return (
//     <div>
//       <h1>Lista de Usuários</h1>
//       <ul>
//         {users.map(user => (
//           <li key={user.id}>{user.nome} </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserList;


import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'; //npm i react-router-dom --save
import './App.css';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';
import ListUser from './components/ListUser';

function App() {
  return (
    <div className="container">
      <div className="App">
        <h1 class="page-header text-center">React CRUD (Create Read Update and Delete) with PHP MySQL</h1>

        <BrowserRouter>
          <Link to="user/create" className="btn btn-success">Add New User</Link>

          <Routes>
            <Route index element={<ListUser />} />
            <Route path="user/create" element={<CreateUser />} />
            <Route path="user/:id/edit" element={<EditUser />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
