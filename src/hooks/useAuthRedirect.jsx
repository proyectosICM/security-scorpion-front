import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useAuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const groupId = localStorage.getItem("groupId");

    if (!token || !groupId) {
      navigate("/login");
    }
  }, [navigate]);
}
