import { isLoggedIn } from "api/authentication";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      return navigate('/login');
    }
  })
  return children;
}

export default Protected