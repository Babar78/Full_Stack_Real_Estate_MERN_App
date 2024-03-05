import React, { useContext, useEffect } from "react";

import Header from "../Header/Header";

import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { createUser } from "../../utils/api";
import UserDetailsContext from "../../context/userDetailsContext";
import useFavourites from "../../hooks/useFavourites";
const Layout = () => {

  useFavourites();

  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const { setUserDetails } = useContext(UserDetailsContext);

  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email, token),
  });

  useEffect(
    () => {
      const getTokenAndRegister = async () => {

        const res = await getAccessTokenSilently({
          authorizationParams: {
            audience: "http://localhost:8000",
            scope: "openid profile email",
          }
        });
        localStorage.setItem("access_token", res);
        setUserDetails((prev) => ({ ...prev, token: res }));
        mutate(res);
      };

      isAuthenticated && getTokenAndRegister();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isAuthenticated]
  );

  return (
    <>
      {/* Overflow:hidden Property will change the navbar from sticky */}
      <div style={{ background: "var(--black)" }}>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
