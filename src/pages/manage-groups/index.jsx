import React, { useState } from "react";
import { NavbarCommon } from "../../common/navbarCommon";
import { useGetAllGroupsPaged, useCreateGroup, useUpdateGroup } from "../../api/hooks/useGroup";
import { Table, Pagination, Button, Modal, Form } from "react-bootstrap";

export const ManageGroupsIndex = () => {
  const [page, setPage] = useState(0);
  const size = 10;

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [groupToEdit, setGroupToEdit] = useState(null);
  const [newGroup, setNewGroup] = useState({
    nameGroup: "",
    username: "",
    password: "",
    role: "USER",
  });

  const [error, setError] = useState("");

  const { data, isLoading, isError } = useGetAllGroupsPaged(page, size);
  const createGroupMutation = useCreateGroup();
  const updateGroupMutation = useUpdateGroup();

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < data.totalPages) {
      setPage(newPage);
    }
  };

  const handleInputChange = (e) => {
    setNewGroup({ ...newGroup, [e.target.name]: e.target.value });
  };

  const handleCreateGroup = () => {
    if (newGroup.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    createGroupMutation.mutate(newGroup, {
      onSuccess: () => {
        setShowCreateModal(false);
        setNewGroup({
          nameGroup: "",
          username: "",
          password: "",
          role: "USER",
        });
      },
    });
  };

  const handleEditGroup = () => {
    if (newGroup.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    updateGroupMutation.mutate(
      { ...groupToEdit, ...newGroup },
      {
        onSuccess: () => {
          setShowEditModal(false);
          setNewGroup({
            nameGroup: "",
            username: "",
            password: "",
            role: "USER",
          });
        },
      }
    );
  };

  const handleEditClick = (group) => {
    setGroupToEdit(group);
    setNewGroup({
      nameGroup: group.nameGroup,
      username: group.username,
      password: group.password,
      role: group.role, // Role no puede ser modificado
    });
    setShowEditModal(true);
  };

  return (
    <div className="p-4">
      <NavbarCommon />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Administrar Grupos</h1>
        <Button onClick={() => setShowCreateModal(true)}>Agregar grupo</Button>
      </div>

      {isLoading && <p>Cargando...</p>}
      {isError && <p>Error al cargar los grupos.</p>}

      {data && (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Usuario</th>
                <th>Estado</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.content.map((group) => (
                <tr key={group.id}>
                  <td>{group.id}</td>
                  <td>{group.nameGroup}</td>
                  <td>{group.username}</td>
                  <td>{group.active ? "Activo" : "Inactivo"}</td>
                  <td>{group.role}</td>
                  <td>
                    <Button variant="warning" onClick={() => handleEditClick(group)}>
                      Editar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-center mt-4">
            <Pagination>
              <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 0} />
              {[...Array(data.totalPages).keys()].map((p) => (
                <Pagination.Item key={p} active={p === page} onClick={() => handlePageChange(p)}>
                  {p + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next onClick={() => handlePageChange(page + 1)} disabled={page === data.totalPages - 1} />
            </Pagination>
          </div>
        </>
      )}

      {/* Modal para agregar grupo */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar nuevo grupo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="nameGroup" className="mb-3">
              <Form.Label>Nombre del grupo</Form.Label>
              <Form.Control type="text" name="nameGroup" value={newGroup.nameGroup} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="username" className="mb-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Control type="text" name="username" value={newGroup.username} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" name="password" value={newGroup.password} onChange={handleInputChange} />
            </Form.Group>
            {error && <p className="text-danger">{error}</p>} {/* Mostrar el mensaje de error */}
            <Form.Group controlId="role" className="mb-3">
              <Form.Label>Rol</Form.Label>
              <Form.Select name="role" value={newGroup.role} onChange={handleInputChange}>
                <option value="USER">USER</option>
                <option value="ADMINISTRATOR">ADMINISTRATOR</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCreateGroup} disabled={createGroupMutation.isLoading}>
            {createGroupMutation.isLoading ? "Guardando..." : "Guardar"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para editar grupo */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar grupo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="nameGroup" className="mb-3">
              <Form.Label>Nombre del grupo</Form.Label>
              <Form.Control type="text" name="nameGroup" value={newGroup.nameGroup} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="username" className="mb-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Control type="text" name="username" value={newGroup.username} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" name="password" value={newGroup.password} onChange={handleInputChange} />
            </Form.Group>
            {error && <p className="text-danger">{error}</p>} {/* Mostrar el mensaje de error */}
            <Form.Group controlId="role" className="mb-3">
              <Form.Label>Rol</Form.Label>
              <Form.Select name="role" value={newGroup.role} onChange={handleInputChange}>
                <option value="USER">USER</option>
                <option value="ADMINISTRATOR">ADMINISTRATOR</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleEditGroup} disabled={updateGroupMutation.isLoading}>
            {updateGroupMutation.isLoading ? "Guardando..." : "Guardar cambios"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
