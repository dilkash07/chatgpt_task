import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import Error from "./pages/Error";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Header from "./components/core/Header";

function App() {
  const signupData = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(signupData);
  }, [signupData]);

  return (
    <div className="h-screen w-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
