import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Sppiner from "../Sppiner";
export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/user-auth`, {
        headers: {
          authorization: auth?.token,
        },
      });
      console.log(res);
      if (res && res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);
  return ok ? <Outlet /> : <Sppiner link="login" />;
}
