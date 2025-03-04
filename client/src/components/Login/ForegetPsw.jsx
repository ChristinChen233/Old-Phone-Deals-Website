import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseURL } from "../../utils/constant";
import "../../index.css";
import "./Login.css";

//disabled={disabled} mybutton.Content = "Save";

function ForgetPsw() {
  const [email, setEmail] = useState("");
  const [errs, setErrs] = useState("");
  const [msg, setMsg] = useState("");
  const [indicator, setIndicator] = useState(false);

  function validation(values) {
    let err = {};
    const email_pattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (values.email === "") {
      err.email = "Please input your email";
      setIndicator(true);
    } else if (values.email.length >= 50) {
      err.email = "Your email is too long";
      setIndicator(true);
    } else if (!email_pattern.test(values.email)) {
      err.email = "Your email pattern is incorrect";
      setIndicator(true);
    } else {
      err.email = "";
    }
    return err;
  }

  async function sendLink(e) {
    setErrs({});
    setMsg("");
    setIndicator(false);
    e.preventDefault();
    try {
      setErrs(validation({ email: email }));
      if (indicator) {
        console.log("hi");
        return;
      }
      await axios
        .post(`${baseURL}/forgetpsw`, {
          email,
        })
        .then((res) => {
          if (res.data === "noexist") {
            setErrs({
              email: "You input wrong email, or your email is not registered",
            });
          }
          if (res.data === "verify sent") {
            setErrs({ email: "Your email hasn't been verified" });
            setMsg("A verification link has been sent to your email!");
          }
          if (res.data === "reset sent") {
            setMsg("A reset password link has been sent to your email.");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="page-container form-container">
      <form action="POST" className="form-body">
      <h1>Forget Password</h1>
        <span>
          Please input your email and click the button below, we will send you a
          link for resetting your password!
        </span>
        <div className="form-group">
          <label htmlFor="email">
            Email:
          </label>
          <input
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
        {msg && <span className="suc">{msg}</span>}
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="btn"
            id="send-reset"
            onClick={sendLink}>
            Send reset password Link
          </button>
        </div>
        <strong>
          No account?{" "}
          <Link to="/signup" className="login-link">
            Register
          </Link>
          !
        </strong>{" "}
        <br></br>
        <strong>
          <Link to="/login" className="login-link">
            log in
          </Link>
        </strong>
        <br></br>
        <small>
          PS: If you didn't receive the password reset link, please check your
          email Span
        </small>
      </form>
    </div>
  );
}

export default ForgetPsw;
