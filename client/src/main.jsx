import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { createTheme, MantineProvider } from '@mantine/core';

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-3kzcm2psjq0mhye5.us.auth0.com"
    clientId="EwoLkhb2ZpoMI9JgOzwIQ6w7JFSrLlkL"
    authorizationParams={{
      redirect_uri: "http://localhost:5173/",
    }}
    audience="http://localhost:8000"
    scope="openid profile email"
  >
    <MantineProvider>
      <App />
    </MantineProvider>
  </Auth0Provider>
);
