import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
//  import { clearLocalStorage } from "../utils/storageUtils";

export function NavbarCommon() {
  const navigation = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("groupId");
    //clearLocalStorage();
    navigation("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand style={{ marginLeft: "25px", cursor: "pointer" }} onClick={() => navigation("/")}>
        Inicio
      </Navbar.Brand>

      {/* Toggle button for mobile view */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      {/* Collapsible nav items */}
      <Navbar.Collapse id="basic-navbar-nav">
        {/* Centering the navigation links */}
        <Nav className="mx-auto">
          {<Nav.Link onClick={() => navigation("/")}>Panel Principal</Nav.Link>}
          {localStorage.getItem("role") === "ADMINISTRATOR" && <Nav.Link onClick={() => navigation("/manage-groups")}>Administrar Grupos</Nav.Link>}
          {/*<Nav.Link onClick={() => navigation("/create-device")}>Crear un dispositivo</Nav.Link>*/}
        </Nav>

        {/* Right-aligned logout button */}
        <Button style={{ marginRight: "25px" }} onClick={handleLogout} variant="outline-light">
          Cerrar Sesión
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}
