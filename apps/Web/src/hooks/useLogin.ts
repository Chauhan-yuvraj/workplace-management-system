import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginUser } from "@/store/slices/authSlice";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(resultAction)) {
      navigate("/");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    error,
    handleLogin,
  };
};
