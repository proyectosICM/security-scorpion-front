import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import { DeviceGroupRoutes } from "../../api/apiurls";

export function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const requestData = {
        username: data.username,
        password: data.password,
      };
      console.log(data)
      const response = await axios.post(`${DeviceGroupRoutes.auth}`, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200) {
        console.log("Usuario autenticado:", response.data);
        localStorage.setItem("token", "fake-jwt-token"); // Aquí deberías almacenar un token real si lo devuelves desde el backend
        localStorage.setItem("groupId", response.data.id);
        localStorage.setItem("role", response.data.role); // Almacena el nombre de usuario si es necesario
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response) {
        // Extraemos el mensaje si existe, o mostramos el error genérico
        const errorMsg = typeof error.response.data === "string"
          ? error.response.data
          : error.response.data.error || "Error desconocido";
  
        setErrorMessage(errorMsg);
      } else {
        setErrorMessage("Error de conexión con el servidor");
      }
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Iniciar Sesión</h1>
        <FaUserCircle className="user-icon" />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <label>Nombre de usuario:</label>
            <input
              type="text"
              {...register("username", { required: "El nombre de usuario es obligatorio" })}
              className={errors.username ? "input-error" : ""}
            />
            {errors.username && <p className="error-message">{errors.username.message}</p>}
          </div>

          <div className="input-group">
            <label>Contraseña:</label>
            <input
              type="password"
              {...register("password", { required: "La contraseña es obligatoria" })}
              className={errors.password ? "input-error" : ""}
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>

          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
