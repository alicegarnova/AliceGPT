import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";
import Order from "./pages/Order";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Details from "./pages/Details";
import { CartProvider } from "./Context/CartContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#de0f1cff",
      100: "#462424ff",
    },
    secondary: {
      main: "#000000",
      100: "#000000ff",
    },
  },
});

export const App = () => {
  return (
    <CartProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/order" element={<Order />} />
            <Route path="/details/:id" element={<Details />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </CartProvider>
  );
};
