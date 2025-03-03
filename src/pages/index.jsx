import { useState } from "react";
import { Button, ButtonGroup, Container, Modal, Form } from "react-bootstrap";
import { FaCogs, FaKey } from "react-icons/fa";
import Swal from "sweetalert2";
import { NavbarCommon } from "../common/navbarCommon";
import { ItemCard } from "./itemCard";

const devices = [
  { id: 1, name: "Device A", ip: "127.0.0.10" },
  { id: 2, name: "Device B", ip: "127.0.0.11" },
  { id: 3, name: "Device C", ip: "127.0.0.12" },
  { id: 4, name: "Device D", ip: "127.0.0.13" },
];

export function DashboardIndex() {
  // Estados para el modal de configuración de red
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");

  // Estados para el modal de cambio de credenciales
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSaveNetwork = () => {
    if (!ssid.trim() || !password.trim()) {
      Swal.fire({
        icon: "error",
        title: "Campos vacíos",
        text: "El SSID y la contraseña no pueden estar vacíos.",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Red configurada",
      text: `SSID: ${ssid}`,
    });

    setShowNetworkModal(false);
  };

  const handleSaveCredentials = () => {
    if (!username.trim() || !newPassword.trim()) {
      Swal.fire({
        icon: "error",
        title: "Campos vacíos",
        text: "El usuario y la contraseña no pueden estar vacíos.",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Credenciales actualizadas",
      text: `Nuevo usuario: ${username}`,
    });

    setShowCredentialsModal(false);
  };

  return (
    <div>
      <NavbarCommon />
      <Container className="d-flex flex-column align-items-center mt-4">
        <h1>Menú de Grupo</h1>
        <ButtonGroup style={{ margin: "20px 0" }}>
          <Button onClick={() => setShowNetworkModal(true)}>
            <FaCogs /> Configurar red
          </Button>
          <Button onClick={() => setShowCredentialsModal(true)}>
            <FaKey /> Cambiar credenciales de grupo
          </Button>
        </ButtonGroup>
        <div style={{ width: "100%" }}>
          <h2>Dispositivos</h2>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {devices.map((device) => (
              <ItemCard key={device.id} device={device} />
            ))}
          </div>
        </div>
      </Container>

      {/* Modal para configurar red */}
      <Modal show={showNetworkModal} onHide={() => setShowNetworkModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Configurar Red</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>SSID</Form.Label>
              <Form.Control
                type="text"
                value={ssid}
                onChange={(e) => setSsid(e.target.value)}
                placeholder="Nombre de la red"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingrese la contraseña"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNetworkModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveNetwork}>
            Guardar configuración
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para cambiar credenciales */}
      <Modal show={showCredentialsModal} onHide={() => setShowCredentialsModal(false)}>
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
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nueva Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Ingrese la nueva contraseña"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCredentialsModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveCredentials}>
            Guardar credenciales
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
