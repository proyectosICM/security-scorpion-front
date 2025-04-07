import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export function DeviceCreationModal({ show, handleClose }) {
  const [nameDevice, setNameDevice] = useState("");
  const [loading, setLoading] = useState(false);
  const [deviceType, setDeviceType] = useState("ACTIVADOR");

  const resetFields = () => {
    setNameDevice("");
    setDeviceType("ACTIVADOR");
  };

  const handleSave = () => {
    // Aquí puedes agregar la lógica para guardar el dispositivo
    console.log("Guardando dispositivo:", { nameDevice, deviceType });
    handleClose();
    resetFields();
  };
  
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Dispositivo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nuevo dispositivo</Form.Label>
            <Form.Control
              type="text"
              value={nameDevice}
              onChange={(e) => setNameDevice(e.target.value)}
              placeholder="Ingrese el nombre del nuevo dispositivo"
              disabled={loading}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tipo de dispositivo</Form.Label>
            <Form.Select value={deviceType} onChange={(e) => setDeviceType(e.target.value)} disabled={loading}>
              <option value="ACTIVADOR">ACTIVADOR</option>
              <option value="ALARMA">ALARMA</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={loading || !nameDevice}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
