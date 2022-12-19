import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";

function CheckAuth({ children }) {
  const token = Cookies.get("token");
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setLoading(false);

    if (!res.ok) {
      redirect("/login");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return <p>Loading ... </p>;
  }

  return children;
}

export default CheckAuth;
