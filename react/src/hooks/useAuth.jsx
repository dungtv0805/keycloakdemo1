import React, { useState, useEffect, useRef, useCallback } from "react";
import Keycloak from "keycloak-js";

export const client = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT,
});

const useAuth = () => {
  const isRun = useRef(false);
  const [token, setToken] = useState(null);
  const [isLogin, setLogin] = useState(false);

  const clearToken = useCallback(() => {
    setToken(null);
    setLogin(false);
  }, [token]);
  useEffect(() => {
    if (isRun.current) return;
    isRun.current = true;
    client
      .init({
        onLoad: "check-sso",
        redirectUri: "http://chimseoclient.com:5175/",
        responseMode: "query",
        // flow: "hybrid",
        adapter: "default",
        checkLoginIframe: false,
        silentCheckSsoRedirectUri:
          window.location.origin + "/silent-check-sso.html",
        pkceMethod: "S256",
      })
      .then((res) => {
        setLogin(res);
        // client.loadUserInfo();
        // if (res) {
        //   console.log(client.token);
        //   setToken(client.token);
        // }
      });
  }, []);
  return [isLogin, token, clearToken];
};

export default useAuth;
