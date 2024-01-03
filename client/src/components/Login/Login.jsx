import React, { useState } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';
import { useNavigate, Link } from "react-router-dom";
import { baseURL } from "../../utils/constant";
import "../../index.css";
import "./Login.css";


function Login() {
  const history = useNavigate(); //navigate between different pages

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [msg, setMsg] = useState("");
  const [errs, setErrs] = useState({});
  const cookies = new Cookies();


 async function submit(e) {
        e.preventDefault();
        try{
            await axios.post(`${baseURL}/login`, {
                email, password
            })
            .then(res => {
                // console.log(req)
                if(res.data.data === 'exist') {
                  cookies.set("currentUser", 
                  {email: email, token: res.data.token, userId: res.data.userId}, 
                  {maxAge: 21600}); //6 hours
                  //window.localStorage.setItem("currentUser", JSON.stringify({email: email, token: res.data.token, userId: res.data.userId}));
                  history("/")
                  setMsg("Logged in")
                }
                if(res.data === 'noexist') {
                    setErrs({email:"You input wrong email"});
                }
                if(res.data === "noverify") {
                    setErrs({email: "Your email hasn't been verified for a long time, please register again"})
                }
                if (res.data === 'wrong psw') {
                    setErrs({password: "Your password is wrong"})
                }
                if(res.data === "verify sent") {
                    setMsg("Your Email hasn't been verified! \nA verification link has been sent to your email.");
                }
                if (res.data === "resend") {
                }
        }).catch(e=>{
            setErrMsg("Wrong details")
            console.log(e);})
        } catch(e) {
          console.log(e);
        }
      }

  return (
    <form
        onSubmit={submit}
        className="login-container"
      >
      <h1>Login</h1>
        {errMsg && <span className="warn">{errMsg}</span>}
        <div>
          <label htmlFor="email" className="login-label">
            Email:
          </label>
          <br></br>
          <input
            className="login-input"
            type="text"
            placeholder="put_your_email_here@gmail.com"
            id="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <br></br>
          {errs.email && <span className="warn">{errs.email}</span>}
        </div>

        <div>
          <label htmlFor="password" className="login-label">
            Password:
          </label>
          <br></br>
          <input
            className="login-input"
            type="password"
            placeholder=""
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <br></br>
          {errs.password && <span className="warn">{errs.password}</span>}
        </div>

        {msg && <p className="suc">{msg}</p>}
        
        <button type="submit" className="btn btn-green" id="submit">
          Log In
        </button>
        {/* <button className="login-btn" id="test" onClick={test}>
          test
        </button> */}
        <br></br>
        <strong>
          No account?{" "}
          <Link to="/signup" className="login-link">
            Register
          </Link>
          !
        </strong>
        <br></br>

        <strong>
          <Link to="/forgetpsw" className="login-link">
            Forget your password
          </Link>
          ?
        </strong>
      </form>
  );
}

export default Login;
