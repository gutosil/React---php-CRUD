<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include '../controller/userController.php';

$userController = new UserController();

$acao = isset($_REQUEST["acao"]) ? $_REQUEST["acao"] : null;
$id = isset($_REQUEST["id"]) ? $_REQUEST["id"] : null;

switch ($acao) {
    case "GetAllUsers":
        if ($id !== null) {
            echo "Ação 'GetAllUsers' não aceita um ID";
        } else {
            $users = $userController->getAllUsers();
            echo json_encode($users); // Saída em formato JSON
        }
        break;

    case "GetUserById":
        if ($id !== null) {
            $user = $userController->getUserById($id);
            echo json_encode($user);
        } else {
            echo "Ação GetUserById necessita de um ID";
        }
        break;

    case "CreateUser":
        if ($id !== null) {
            echo "Ação 'CreateUser' não aceita um ID";
        } else {
            $users = $userController->createUser();
            echo json_encode($users); // Saída em formato JSON
        }
        break;

    case "DeleteUserById":
        if ($id !== null) {
            $users = $userController->deleteUser($id);
            echo json_encode($users);
        } else {
            echo "Ação 'DeleteUserById' necessita de um ID";
        }
        break;

    case "UpdateUserById":
        if ($id !== null) {
            $users = $userController->updateUserById($id);
            echo json_encode($users);
        } else {
            echo "Ação 'UpdateUserById' necessita de um ID";
        }
        break;
        // Adicione outros casos conforme necessário para outras rotas
    default:
        echo "Rota não encontrada";
}
