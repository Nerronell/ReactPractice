import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

function App() {
  const [count, setCount] = useState(0);
  
  return (
    <>
      <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/signin" element={<Signin />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
          </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
