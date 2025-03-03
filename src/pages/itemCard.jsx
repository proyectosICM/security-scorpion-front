import React, { useState } from "react";
import { Button, Card, Modal, Form } from "react-bootstrap";
import { FaPowerOff, FaWrench } from "react-icons/fa";
import Swal from "sweetalert2";
import { emptyFieldAlert, showActivationAlert, updateDeviceAlert } from "../messages/alerts";

export function ItemCard({ device }) {
  const [showModal, setShowModal] = useState(false);
  const [deviceName, setDeviceName] = useState(device.name);
  const [deviceIP, setDeviceIP] = useState(device.ip);

  const handleActivate = () => {
    showActivationAlert();
  };

  const handleSaveChanges = () => {
    if (!deviceName.trim() || !deviceIP.trim()) {
      emptyFieldAlert();
      return;
    }

    updateDeviceAlert(deviceName, deviceIP);

    setShowModal(false);
  };

  return (
    <>
      <Card style={{ width: "250px" }} className="p-3 shadow-sm text-center">
        <Card.Body>
          <Card.Title>{device.name}</Card.Title>
          <Card.Text>
            <strong>IP:</strong> {device.ip}
          </Card.Text>
          <div className="d-flex flex-column gap-2">
            <Button variant="primary" className="w-100" onClick={handleActivate}>
              <FaPowerOff /> Accionar
            </Button>
            <Button variant="secondary" className="w-100" onClick={() => setShowModal(true)}>
              <FaWrench /> Configurar
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Modal para editar dispositivo */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Dispositivo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del dispositivo</Form.Label>
              <Form.Control type="text" value={deviceName} onChange={(e) => setDeviceName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Dirección IP</Form.Label>
              <Form.Control type="text" value={deviceIP} onChange={(e) => setDeviceIP(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
