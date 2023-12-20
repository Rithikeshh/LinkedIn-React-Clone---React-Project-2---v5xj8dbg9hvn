import "../styles/App.css";
import { Route, Routes } from "react-router-dom";
import Router from "./Router";
import Home from "./pages/Home/Home";
import AuthProvider from "./providers/AuthProvider";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Feed from "./pages/Feed/Feed";
import AuthNavigator from "./navigator/AuthNavigator";
import MyNetwork from "./pages/MyNetwork/MyNetwork";

function App() {
  return(
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          {/* <Route path="/*" element={<Router />}/> */}
          <Route path="/feed" element={<AuthNavigator><Feed /></AuthNavigator>}/>
          <Route path="/mynetwork" element={<AuthNavigator><MyNetwork /></AuthNavigator>}/>
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App;
