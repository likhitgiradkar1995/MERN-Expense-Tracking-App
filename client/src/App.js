import AppBar from "./components/AppBar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "./store/auth";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

function App() {
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    setLoading(true);
    const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setLoading(false);

    if (res.ok) {
      //redirect("/login");
      const user = await res.json();
      dispatch(getUser(user));
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return <p>Loading ....</p>;
  }

  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
}

export default App;
