import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Keycloak from "keycloak-js";
import { client } from "../hooks/useAuth";

const Protected = ({ token, clearToken }) => {
  const isRun = useRef(false);

  const [data, setData] = useState(null);
  // const [ clearToken] = useAuth();

  // useEffect(() => {
  //   if (isRun.current) return;

  //   isRun.current = true;

  //   const config = {
  //     headers: {
  //       authorization: `Bearer ${token}`,
  //     },
  //   };

  //   axios
  //     .get("/documents", config)
  //     .then((res) => setData(res.data))
  //     .catch((err) => console.error(err));
  // }, []);

  return data ? (
    <>
      {data.map((rec, i) => (
        <h3 key={i}>{rec}</h3>
      ))}
    </>
  ) : (
    <>
      <div>Protected</div>
      <button
        onClick={() => {
          client.logout();
        }}
      >
        logout
      </button>
    </>
  );
};

export default Protected;
