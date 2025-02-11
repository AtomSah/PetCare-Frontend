import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Register from "./core/public/auth/Register";
import ForgotPassword from "./core/public/auth/ForgotPassword";
import Dashboard from "./core/private/dashboard";
import UserManagement from "./core/private/userManagement";
import HomePage from "./core/public/home/Home";
import LoginPage from "./core/public/auth/login";
import Layout from "./core/private/layout";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  {
    path: "/admin",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="dashboard" /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "user-management", element: <UserManagement /> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
