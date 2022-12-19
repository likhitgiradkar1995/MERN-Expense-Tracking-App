import AppBar from "./components/AppBar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/auth";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser);
  }, []);

  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
}

export default App;
