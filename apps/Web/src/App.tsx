import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { fetchCurrentUser } from "./store/slices/authSlice";

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && user?.requiresPasswordChange) {
      if (location.pathname !== "/change-password") {
        navigate("/change-password");
      }
    }
  }, [isAuthenticated, user, navigate, location.pathname]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
