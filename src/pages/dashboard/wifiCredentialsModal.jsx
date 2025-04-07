import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import { DeviceGroupRoutes, WEBSOCKET_SERVER } from "../../api/apiurls"; // Ajusta la ruta según tu estructura
 
export function WifiCredentialsModal({ show, handleClose }) {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const groupId = localStorage.getItem("groupId");
  const [socket, setSocket] = useState(null);

  const resetFields = () => {
    setSsid("");
    setPassword("");
  };

  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_SERVER); 
    setSocket(ws);
    return () => {
      ws.close();
    };
  }, []);

  const handleSaveCredentials = async () => {
    if (!ssid.trim() || !password.trim()) {
      Swal.fire({
        icon: "error",
        title: "Campos vacíos",
        text: "El usuario y la contraseña no pueden estar vacíos.",
      });
      return;
    }

    const credentials = { ssid, password };

    setLoading(true);
    try {
      await axios.put(`${DeviceGroupRoutes.wifiCredentials}/${groupId}`, credentials);
      const message = `cwc:${ssid}:${password}`;
      socket.send(message);
      Swal.fire({
        icon: "success",
        title: "Credenciales actualizadas",
        text: `Nuevo usuario: ${ssid}`,
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

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cambiar Credenciales de Grupo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre de la nueva red</Form.Label>
            <Form.Control
              type="text"
              value={ssid}
              onChange={(e) => setSsid(e.target.value)}
              placeholder="Ingrese el nuevo usuario"
              disabled={loading}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nueva Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese la nueva contraseña"
              disabled={loading}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSaveCredentials} disabled={loading}>
          {loading ? "Guardando..." : "Guardar credenciales"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
