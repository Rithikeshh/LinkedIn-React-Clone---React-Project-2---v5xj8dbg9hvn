import "../styles/App.css";
import { Route, Routes } from "react-router-dom";
import Router from "./Router";
import Home from "./pages/Home/Home";
import AuthProvider from "./providers/AuthProvider";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

function App() {
  return(
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/*" element={<Router />}/>
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App;
