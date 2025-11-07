// hooks/useAuth.js
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AuthAction from "../redux/auth/actions";
import { useNavigate } from "react-router-dom";

const { refetchAuth } = AuthAction;

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.Auth);

  useEffect(() => {
    const token = localStorage.getItem("idToken");
    
    if (!token) {
      navigate("/signin");
      return;
    }

    console.log("Auth status:", status);

    if (status === "idle") {
      dispatch(refetchAuth);
    }
  }, [dispatch, status, navigate]);
};

export default useAuth;
