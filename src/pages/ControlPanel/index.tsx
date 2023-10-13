import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ControlPanel = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (window.location.pathname === "/") navigate("/home");
  }, []);

  return null;
};

export default ControlPanel;
