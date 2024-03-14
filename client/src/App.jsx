import '@mantine/core/styles.css'
import { Suspense, useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Website from "./pages/Website";
import Properties from "./pages/Properties/Properties";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropertyDetail from "./pages/PropertyDetail/PropertyDetail";
import UserDetailsContext from "./context/userDetailsContext.js";
import Bookings from './pages/Bookings/Bookings.jsx';
import Favourites from './pages/Favourites/Favourites.jsx';

function App() {
  const queryClient = new QueryClient();

  // Load user details from localStorage on app initialization
  const [userDetails, setUserDetails] = useState(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    return storedUserDetails ? JSON.parse(storedUserDetails) : {
      favourites: [],
      bookings: [],
      token: null,
    };
  });
  // Save user details to localStorage whenever userDetails changes
  useEffect(() => {
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
  }, [userDetails]);

  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Website />} />
                <Route path="/properties">
                  <Route index element={<Properties />} />
                  <Route path=":propertyId" element={<PropertyDetail />} />
                </Route>
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/favourites" element={<Favourites />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </UserDetailsContext.Provider>
  );
}

export default App;
