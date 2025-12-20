import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { fetchCurrentUser } from "./store/slices/authSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
