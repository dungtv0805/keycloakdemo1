import React from "react";
import Keycloak from "keycloak-js";
import { client } from "../hooks/useAuth";

const Public = () => {
  return (
    <>
      <div>Public</div>{" "}
      <button
        onClick={() => {
          // console.log("object", client);
          client.login();
        }}
      >
        login
      </button>
    </>
  );
};

export default Public;
