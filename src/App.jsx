import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cartoons from "./pages/Cartoons";
import CartoonShow from "./pages/CartoonShow";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cartoons" element={<Cartoons />} />
      <Route path="/cartoons/:id" element={<CartoonShow />} />
    </Routes>
  );
}

export default App;
