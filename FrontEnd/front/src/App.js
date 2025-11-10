import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import PrivateRoute from "./components/PrivateRoutes";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import RecipeList from "./pages/RecipeList";
import AddRecipe from "./pages/AddRecipe";
import EditRecipe from "./pages/EditRecipe";
import RecipeDetail from "./pages/RecipeDetail";
import Wrapper from "./components/Wrapper";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import theme from "./styles/theme";

function AppContent() {


  return (
    <>
      <ToastContainer />
      <Navbar />
      <Wrapper>
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
      </Wrapper>

    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}
