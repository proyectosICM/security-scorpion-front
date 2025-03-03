import React from "react";
import { useForm } from "react-hook-form";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>
        <h1>
          <FaUserCircle />
        </h1>
      </div>
    </div>
  );
}
