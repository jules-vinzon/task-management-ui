// hooks/useAuth.js
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AuthAction from "../redux/auth/actions";
import { useNavigate } from "react-router-dom";

const { refetchAuth, logout } = AuthAction;

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.Auth);
  const { tokenError } = useSelector((state) => state.Tasks);

  console.log("tokenError", tokenError)

  useEffect(() => {
    const token = localStorage.getItem("idToken");
    
    if (!token || (tokenError && tokenError === "Invalid credentials")) {
      navigate("/signin");
      dispatch(logout()); 
      return;
    }

    console.log("Auth status:", status);

    if (status === "idle") {
      dispatch(refetchAuth);
    }    
  }, [dispatch, status, navigate, tokenError]);
};

export default useAuth;
