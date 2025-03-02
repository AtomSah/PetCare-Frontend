import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Public routes
import Register from "./core/public/auth/Register";
import HomePage from "./core/public/home/Home";
import LoginPage from "./core/public/auth/Login";
import ServicesPage from "./core/public/components/ServicesPage";
import ContactPage from "./core/public/components/ContactPage";
import AboutPage from "./core/public/components/AboutPage";
import PetDetailsPage from "./core/public/home/pet_details";

// Admin routes
import Dashboard from "./core/private/Dashboard";

// Context and Route Protection
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import Layout from "./core/private/Layout";
import ManagePets from "./core/private/manage-pets";
import UserManagement from "./core/private/user-management";
import Booking from "./core/private/booking";
import { AuthContextProvider } from "./context/AuthContext";
import User from "./core/private/user-management";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  // Public Routes
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <Register /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/contact", element: <ContactPage /> },
  { path: "/services", element: <ServicesPage /> },
  { path: "/pet/:id", element: <PetDetailsPage /> },

  // Admin Routes (Protected)
  {
    path: "/admin",
    element: <AdminRoute />, // Protect admin routes specifically for admin role
    children: [
      { path: "", element: <Navigate to="dashboard" replace /> },
      {
        path: "",
        element: <Layout />, // Layout with nested routing
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "pets", element: <ManagePets /> },
          { path: "bookings", element: <Booking /> },
          { path: "users", element: <UserManagement /> },
          { path: "users/edit/:id", element: <UserManagement /> },
          { path: "users/:userId/bookings", element: <User /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthContextProvider>
  );
}

export default App;