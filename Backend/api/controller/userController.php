<?php
include '../database.php';

class UserController
{
    private $conn;

    public function __construct()
    {
        $objDb = new Database;
        $this->conn = $objDb->connect();
    }

    public function getAllUsers()
    {
        $query = "SELECT * FROM USUARIOS";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $users;
    }

    public function getUserById(int $id)
    {
        try {
            $query = "SELECT * FROM usuarios WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            return $user;
        } catch (Exception $e) {
            echo 'Erro ao buscar usuário: ' . $e->getMessage();
            return null;
        }
    }
    public function createUser()
    {
        try {
            $user = json_decode(file_get_contents('php://input'));
            $sql = "INSERT INTO USUARIOS(nome, email) VALUES(:nome, :email)";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':nome', $user->nome);
            $stmt->bindParam(':email', $user->email);

            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record created successfully.'];
            }

            return $response;
        } catch (Exception $e) {
            echo 'Erro ao criar usuário: ' . $e->getMessage();
            return null;
        }
    }

    public function deleteUser(int $id)
    {
        try {
            $sql = "DELETE FROM USUARIOS WHERE id = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $id);
            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record Deleted successfully.'];
            }
            return $response;
        } catch (Exception $e) {
            echo 'Erro ao deletar usuário: ' . $e->getMessage();
            return null;
        }
    }

    public function updateUserById(int $id)
    {
        try {
            // Verificar se o usuário existe
            $userExists = $this->checkUserExists($id);
            if (!$userExists) {
                return ['status' => 0, 'message' => 'Usuário não encontrado.'];
            }

            $user = json_decode(file_get_contents('php://input'));

            $sql = "UPDATE USUARIOS SET nome = :nome, email = :email WHERE id = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':nome', $user->nome);
            $stmt->bindParam(':email', $user->email);

            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Registro atualizado com sucesso.'];
            } else {
                $response = ['status' => 0, 'message' => 'Falha ao atualizar o registro.'];
            }

            return $response;
        } catch (Exception $e) {
            echo 'Erro ao atualizar usuário: ' . $e->getMessage();
            return null;
        }
    }



    private function checkUserExists(int $id)
    {
        $query = "SELECT COUNT(*) FROM USUARIOS WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $count = $stmt->fetchColumn();
        return $count > 0;
    }
}
