import { useEffect, useState } from "react";
import { Button, ButtonGroup, Container, Modal, Form } from "react-bootstrap";
import { FaCogs, FaKey, FaPlusCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { NavbarCommon } from "../../common/navbarCommon";
import { ItemCard } from "./itemCard";
import axios from "axios";
import { baseURL } from "../../api/apiurls";
import { DeviceRoutes } from "../../api/apiurls";
import { GroupCredentialsModal } from "./groupCredentialsModal";
import { WifiCredentialsModal } from "./wifiCredentialsModal";
import { useNavigate } from "react-router-dom";
import { useAuthRedirect } from "../../hooks/useAuthRedirect";
import { DeviceCreationModal } from "./deviceCreationModal";

export function DashboardIndex() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const groupId = localStorage.getItem("groupId");

  useAuthRedirect();
  useEffect(() => {
    axios
      .get(`${DeviceRoutes.byGroup}/${groupId}`, {})
      .then((response) => {
        setData(response.data); // Guardamos los datos obtenidos
      })
      .catch((error) => {
        setError(error.message); // Guardamos el error en caso de fallo
      })
      .finally(() => {
        setLoading(false); // Indicamos que la carga terminó
      });
  }, []);

  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [showDeviceCreationModal, setShowDeviceCreationModal] = useState(false);

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
          <Button variant="success" style={{ margin: "20px 0px", width: "100px" }} onClick={() => setShowDeviceCreationModal(true)}>
            <FaPlusCircle /> Crear
          </Button>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {data.length > 0 ? (
              data.map((device) => <ItemCard key={device.id} device={device} setData={setData} />)
            ) : (
              <p>No hay dispositivos disponibles.</p>
            )}
          </div>
        </div>
      </Container>

      {/* Modal para configurar red */}
      <WifiCredentialsModal show={showNetworkModal} handleClose={() => setShowNetworkModal(false)} />

      {/* Modal de credenciales */}
      <GroupCredentialsModal show={showCredentialsModal} handleClose={() => setShowCredentialsModal(false)} />

      <DeviceCreationModal show={showDeviceCreationModal} handleClose={() => setShowDeviceCreationModal(false)} />
    </div>
  );
}
