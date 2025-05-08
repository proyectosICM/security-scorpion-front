import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useCreateDevice } from "../../api/hooks/useDevice";

export function DeviceCreationModal({ show, handleClose }) {
  const [nameDevice, setNameDevice] = useState("");
  const [loading, setLoading] = useState(false);
  const [deviceType, setDeviceType] = useState("ACTUATOR");
  const createDeviceMutation = useCreateDevice();
  const resetFields = () => {
    setNameDevice("");
    setDeviceType("ACTUATOR");
  };

  const handleSave = () => {
    // Aquí puedes agregar la lógica para guardar el dispositivo

    const request = {
      nameDevice: nameDevice,
      ipLocal: "192.168.0.0",
      deviceGroupModel: {
        id: localStorage.getItem("groupId"),
      },
      type: deviceType,
    };

    createDeviceMutation.mutate(request, {
      onSuccess: () => {},
      onError: (error) => {
        console.error("Error al crear dispositivo:", error);
        // Aquí podrías mostrar un toast o alerta
      },
    });
    resetFields();
    handleClose();
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
              <option value="ACTUATOR">ACTIVADOR</option>
              <option value="ALARM">ALARMA</option>
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
