import Swal from "sweetalert2";

/**
 * Muestra una alerta cuando el usuario no tiene acceso.
 * @param {number} status - Código de estado HTTP.
 */
export function showAccessDeniedAlert(status) {
  if (status === 403) {
    Swal.fire({
      icon: "error",
      title: "Acceso denegado",
      text: "Usuario o contraseña incorrectos.",
    });
  }
}

/**
 * Muestra una alerta cuando un usuario no tiene permisos o el grupo no está habilitado.
 * @param {boolean} isGroupDisabled - Indica si el grupo está inhabilitado.
 */
export function showUnauthorizedAlert(isGroupDisabled = false) {
  Swal.fire({
    icon: "error",
    title: "Acceso denegado",
    text: isGroupDisabled
      ? "Este grupo no está habilitado para el uso de la plataforma."
      : "No tienes los permisos necesarios para realizar esta acción.",
  });
}

/**
 * Muestra una alerta cuando se activa un dispositivo.
 * @param {Object} device - Dispositivo a activar.
 */
export const showActivationAlert = (device) => {
  Swal.fire({
    title: `Activando ${device.name}`,
    text: `IP: ${device.ip}`,
    icon: "success",
    confirmButtonText: "Aceptar",
  });
};

export const emptyFieldAlert = () => {
  Swal.fire({
    icon: "error",
    title: "Campos vacíos",
    text: "El nombre y la IP no pueden estar vacíos.",
  });
};

export const updateDeviceAlert = (deviceName, deviceIP) => {
  Swal.fire({
    icon: "success",
    title: "Dispositivo actualizado",
    text: `Nombre: ${deviceName}\nIP: ${deviceIP}`,
  });
};
