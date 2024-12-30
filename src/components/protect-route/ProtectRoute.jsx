import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectRoute = ({ children }) => {
  const [token, setToken] = useState("");
const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    console.log(token, "token");
  }, []);

  if (token) {
    return <>{children}</>;
  } else {
    navigate('/sign-in');
  }
};

export default ProtectRoute;

