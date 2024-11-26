import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import VehicleInformation from "./pages/vehicle/VehicleInformation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/vehicle-information" element={<VehicleInformation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
