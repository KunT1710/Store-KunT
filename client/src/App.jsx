import AllRoutes from "./components/all-routes";
import './App.css';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUserFromToken } from "./reduxs/auth.thunk";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromToken());
  }, [dispatch]);

  return (
    <>
      <AllRoutes />
    </>
  )
}

export default App
