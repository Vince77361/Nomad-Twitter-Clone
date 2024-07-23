import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/Profile";
import Login from "./routes/login";
import Createaccount from "./routes/createaccount";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loadingscreen";
import { auth } from "./routes/firebase";
import ProtectedRoute from "./components/protectedroute";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const init = async () => {
    await auth.authStateReady();
    setTimeout(() => setIsLoading(false), 2000);
  };
  useEffect(() => {
    init();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/createaccount",
      element: <Createaccount />,
    },
  ]);

  const GlobalStyles = createGlobalStyle`
  ${reset};
  body {
  background: black;
  color: white;
  font-family: sans-serif;
}
`;

  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading === true ? (
        <LoadingScreen />
      ) : (
        <RouterProvider router={router} />
      )}
    </Wrapper>
  );
}

export default App;
