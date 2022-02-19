import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Insert from "./components/Insert";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="h-full w-full bg-black bg-opacity-10">
      <Router>
        <Navbar />
        <div className="h-full pt-16">
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="add" element={<Insert />} />
            <Route path=":productId/edit" element={<Insert />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
