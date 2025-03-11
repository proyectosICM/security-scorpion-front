import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import { DeviceGroupRoutes } from "../../api/apiurls";

export function GroupCredentialsModal({ show, handleClose }) {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const groupId = localStorage.getItem("groupId");

  const resetFields = () => {
    setUsername("");
    setNewPassword("");
  };

  const handleSaveCredentials = async () => {
    if (!username.trim() || !newPassword.trim()) {
      Swal.fire({
        icon: "error",
        title: "Campos vacíos",
        text: "El usuario y la contraseña no pueden estar vacíos.",
      });
      return;
    }

    const credentials = {
      username: username,
      password: newPassword,
    };

    setLoading(true);

    try {
      await axios.put(`${DeviceGroupRoutes.groupCredentials}/${groupId}`, credentials);
      
      Swal.fire({
        icon: "success",
        title: "Credenciales actualizadas",
        text: `Nuevo usuario: ${username}`,
      });

      resetFields();
      handleClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al actualizar",
        text: error.response?.data?.message || "No se pudo actualizar las credenciales.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    resetFields();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Cambiar Credenciales de Grupo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nuevo Usuario</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingrese el nuevo usuario"
              disabled={loading}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nueva Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Ingrese la nueva contraseña"
              disabled={loading}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSaveCredentials} disabled={loading}>
          {loading ? "Guardando..." : "Guardar credenciales"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
