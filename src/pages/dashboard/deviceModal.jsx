import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

export function DeviceModal({ show, onClose, deviceName, setDeviceName, deviceIP, setDeviceIP, onSave }) {

  return (
    <Modal show={show} onHide={onClose}>
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
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={onSave}>
          Guardar cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
