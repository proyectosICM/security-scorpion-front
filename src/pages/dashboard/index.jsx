import { Button, ButtonGroup, Container } from "react-bootstrap";
import { FaCogs, FaKey, FaPlusCircle } from "react-icons/fa";
import { NavbarCommon } from "../../common/navbarCommon";
import { ItemCard } from "./itemCard";
import { GroupCredentialsModal } from "./groupCredentialsModal";
import { WifiCredentialsModal } from "./wifiCredentialsModal";
import { DeviceCreationModal } from "./deviceCreationModal";
import { useNavigate } from "react-router-dom";
import { useAuthRedirect } from "../../hooks/useAuthRedirect";
import { useGetDevicesByGroup } from "../../api/hooks/useDevice"; // Asegúrate de importar bien tu hook
import { useState } from "react";

export function DashboardIndex() {
  const navigate = useNavigate();
  const groupId = localStorage.getItem("groupId");

  useAuthRedirect();

  const { data, isLoading, isError, error } = useGetDevicesByGroup(groupId);

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

          <Button
            variant="success"
            style={{ margin: "20px 0px", width: "100px" }}
            onClick={() => setShowDeviceCreationModal(true)}
          >
            <FaPlusCircle /> Crear
          </Button>

          {isLoading && <p>Cargando dispositivos...</p>}
          {isError && <p>Error al cargar: {error.message}</p>}

          <div className="d-flex flex-wrap justify-content-center gap-3">
            {data?.length > 0 ? (
              data.map((device) => (
                <ItemCard key={device.id} device={device} />
              ))
            ) : (
              !isLoading && <p>No hay dispositivos disponibles.</p>
            )}
          </div>
        </div>
      </Container>

      {/* Modales */}
      <WifiCredentialsModal show={showNetworkModal} handleClose={() => setShowNetworkModal(false)} />
      <GroupCredentialsModal show={showCredentialsModal} handleClose={() => setShowCredentialsModal(false)} />
      <DeviceCreationModal show={showDeviceCreationModal} handleClose={() => setShowDeviceCreationModal(false)} />
    </div>
  );
}
