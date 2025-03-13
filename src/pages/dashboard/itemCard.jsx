import React, { useState, useEffect } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { FaPowerOff, FaWrench } from "react-icons/fa";
import { emptyFieldAlert, showActivationAlert, updateDeviceAlert } from "../../alerts/alerts";
import { DeviceModal } from "./deviceModal";
import axios from "axios";
import { DeviceRoutes, WEBSOCKET_SERVER } from "../../api/apiurls";
 


export function ItemCard({ device, setData }) {
  const [showModal, setShowModal] = useState(false);
  const [deviceName, setDeviceName] = useState("");
  const [deviceIP, setDeviceIP] = useState("");
  const [ws, setWs] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para manejar la carga

  useEffect(() => {
    const socket = new WebSocket(WEBSOCKET_SERVER);

    socket.onopen = () => console.log("WebSocket conectado");
    socket.onclose = () => console.log("WebSocket desconectado");
    socket.onerror = (error) => console.error("WebSocket error", error);

    socket.onmessage = (event) => {    
      if (event.data.includes(`ac:${device.id}:activated:successfully`)) {
        console.log("Mensaje de activación confirmado");
        setIsLoading(false); // Ocultar el mensaje de carga
        showActivationAlert(device);
      }
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [device.id]);

  const handleActivate = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const message = `activate:${device.id}`;
      ws.send(message);
      console.log("Mensaje enviado:", message);
      setIsLoading(true); // Activar el mensaje de carga
    } else {
      console.error("WebSocket no está conectado");
    }
  };

  const handleOpenModal = () => {
    setDeviceName(device.nameDevice || "");
    setDeviceIP(device.ipLocal || "");
    setShowModal(true);
  };

  const handleSaveChanges = async () => {
    if (!deviceName.trim() || !deviceIP.trim()) {
      emptyFieldAlert();
      return;
    }

    const request = {
      nameDevice: deviceName,
      ipLocal: deviceIP,
    };

    await axios.put(`${DeviceRoutes.base}/${device.id}`, request);
    setData((prevData) => prevData.map((item) => (item.id === device.id ? { ...item, ...request } : item)));

    updateDeviceAlert(deviceName, deviceIP);
    setShowModal(false);
  };

  return (
    <>
      <Card style={{ width: "250px" }} className="p-3 shadow-sm text-center">
        <Card.Body>
          <Card.Title>{device.nameDevice}</Card.Title>
          <Card.Text>
            <strong>IP:</strong> {device.ipLocal}
          </Card.Text>
          <div className="d-flex flex-column gap-2">
            <Button variant="primary" className="w-100" onClick={handleActivate} disabled={isLoading}>
              {isLoading ? <Spinner as="span" animation="border" size="sm" /> : <FaPowerOff />} 
              {isLoading ? " Esperando activación..." : " Accionar"}
            </Button>
            <Button variant="secondary" className="w-100" onClick={handleOpenModal}>
              <FaWrench /> Configurar
            </Button>
          </div>
        </Card.Body>
      </Card>

      <DeviceModal
        show={showModal}
        onClose={() => setShowModal(false)}
        deviceName={deviceName}
        setDeviceName={setDeviceName}
        deviceIP={deviceIP}
        setDeviceIP={setDeviceIP}
        onSave={handleSaveChanges}
      />
    </>
  );
}
