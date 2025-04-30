import React from "react";
import { NavbarCommon } from "../../common/navbarCommon";

export const ViewCamerasIndex = () => {

  const groupId = localStorage.getItem("groupId");
  
  const cameraSources = [
    { name: "Camera 1", url: "http://192.168.10.117:554/video" },
    { name: "Camera 2", url: "http://192.168.10.140:8080/video" },
    { name: "Camera 3", url: "http://192.168.10.140:8080/video" },
    { name: "Camera 4", url: "http://192.168.10.140:8080/video" },
  ];

  return (
    <div>
      <NavbarCommon /> 
      <h1>📷 View Cameras</h1>
      <p>This is the view cameras page.</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)", // <-- solo 2 por fila
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {cameraSources.map((camera, index) => (
          <div
            key={index}
            style={{
              border: "2px solid #ccc",
              padding: "10px",
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h3>{camera.name}</h3>
            <img
              src={camera.url}
              alt={camera.name}
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
