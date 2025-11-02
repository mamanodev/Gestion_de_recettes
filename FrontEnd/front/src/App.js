import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import PrivateRoute from "./components/PrivateRoutes";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import RecipeList from "./pages/RecipeList";
import AddRecipe from "./pages/AddRecipe";
import EditRecipe from "./pages/EditRecipe";
import RecipeDetail from "./pages/RecipeDetail";
import "./App.css";

function AppContent() {
  const location = useLocation();

  // on cache la Navbar sur /login et /signup
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup" ||  location.pathname === "/" ;

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          path="/recipes"
          element={
            <PrivateRoute>
              <RecipeList />
            </PrivateRoute>
          }
        />
        <Route
          path="/recipes/add"
          element={
            <PrivateRoute>
              <AddRecipe />
            </PrivateRoute>
          }
        />
        <Route
          path="/recipes/edit/:id"
          element={
            <PrivateRoute>
              <EditRecipe />
            </PrivateRoute>
          }
        />
        <Route
          path="/recipes/:id"
          element={
            <PrivateRoute>
              <RecipeDetail />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}
