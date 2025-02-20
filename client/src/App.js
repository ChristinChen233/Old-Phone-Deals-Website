// Components
import PhoneListing from "./components/main/PhoneListing";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Checkout from "./components/Checkout/Checkout";
import Signup from "./components/Signup/Signup";
import Top5SoldOut from "./components/Top5SoldOut/Top5SoldOut";
import Login from "./components/Login/Login";
import EmaiilVerify from "./components/Signup/EmailVerify";
import ForgetPsw from "./components/Login/ForegetPsw";
import ForgetPswReset from "./components/Login/ResetPsw";
import PhoneDetail from "./components/main/PhoneDetail";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// My Styles
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
	  <title>Old Phone Deals</title>
      <Routes>
        <Route path="/" element={<PhoneListing />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/top-5-sold-out" element={<Top5SoldOut />} />
        <Route path="/forgetpsw" element={<ForgetPsw />} />
        <Route path="/users/:id/verify/:token" element={<EmaiilVerify />} />
        <Route path="/forgetpswUsers" element={<ForgetPswReset />} />
        <Route
          path="/phone/:phoneid"
          element={<PhoneDetail></PhoneDetail>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
