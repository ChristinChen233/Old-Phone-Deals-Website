import React, { useState } from "react";
import axios from "axios";
import { Link, useActionData } from "react-router-dom";
import "../../index.css";
import { baseURL } from "../../utils/constant";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [msg, setMsg] = useState("");
  const [indicator, setIndicator] = useState(false);
  const [errs, setErrs] = useState({});
  const [openCover, setOpenCover] = useState(false);
  const [verifySent, setVerifySent] = useState(false)

  function validation(values) {
    let err = {};
    const email_pattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const name_pattern = /^[A-Za-z0-9]+$/;
    setIndicator(false);
    const psw_pattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%]).{8,15}$/;

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

    if (values.password === "" || values.repeatPassword === "") {
      err.password = "Please input and repeat your password";
      setIndicator(true);
    } else if (values.password.length < 8 || values.password.length > 15) {
      err.password = "Your password should in length from 8 to 15";
      setIndicator(true);
    } else if (!psw_pattern.test(values.password)) {
      err.password =
        "Your password should contain at least 1 upper case character, 1 lower case character, 1 number and a symbol";
      setIndicator(true);
    } else if (values.repeatPassword !== values.password) {
      err.password = "Passwords do not match!";
      setIndicator(true);
    } else {
      err.password = "";
    }

    if (values.firstname === "") {
      err.firstname = "Please input your firstname";
      setIndicator(true);
    } else if (values.firstname.length >= 50) {
      err.firstname = "Your firstname is too long (less than 50)";
      setIndicator(true);
    } else if (!name_pattern.test(values.firstname)) {
      err.firstname = "Your first name can only contain characters(no space)";
      setIndicator(true);
    } else {
      err.firstname = "";
    }

    if (values.lastname === "") {
      err.lastname = "Please input your lastname";
      setIndicator(true);
    } else if (values.lastname.length >= 50) {
      err.lastname = "Your lastname is too long (less than 50)";
      setIndicator(true);
    } else if (!name_pattern.test(values.lastname)) {
      err.lastname = "Your last name can only contain characters(no space)";
      setIndicator(true);
    } else {
      err.lastname = "";
    }

    return err;
  }

  async function submit(e) {
    e.preventDefault();
    setErrMsg("");
    setErrs({});
    setMsg("");
    setIndicator(false);

    try {
      setErrs(
        validation({
          email: email,
          password: password,
          firstname: firstname,
          lastname: lastname,
          repeatPassword: repeatPassword,
        })
      );
      if (indicator) {
        console.log("errs in input");
        return;
      }
      setOpenCover(true);
      await axios
        .post(`${baseURL}/signup`, {
          email,
          password,
          repeatPassword,
          firstname,
          lastname,
        })
        .then((res) => {
          console.log(res)
          //console.log(res.data)
          if (res.data === "exist") {
            setErrs({
              email: "have already registered! Please go to login page",
            });
          }
          if (res.data === "noexist") {
            setErrs({
              email:
                "Your email hasn't been verified for a long time, please register again",
            });
          }
          if (res.data === "verify sent") {
            setMsg(
              "A verification link has been sent to your email\n Please login after verification.\nPlease check the span if can't find in your mail box"
            );
            setVerifySent(true)
          }
          if (res.data === "err") {
            setErrMsg("Something wrong with mango db");
          }
          if (res.data === "insert") {
            setMsg("Insertted your data");
          }
          setOpenCover(false);
        });
    } catch (e) {
      console.log(e);
      setOpenCover(false);
    }
  }

  return (
    <div className="page-container form-container">
      {openCover && (
      <div id="cover" className="cover">
        <div className="form-body" id="cover-inner-box">
          <div className="form-group cover-inner-form-group">
            <h1 style={{textAlign:"center"}}>Registering...</h1>
          </div>
        </div>
      </div>
    )}
      <form action="POST" className="form-body">
        <h1>Signup</h1>
        {errMsg && <span className="warn">{errMsg}</span>}
        {!verifySent && (
          <>
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
        </div>

        <div className="form-group">
          <label htmlFor="password">
            Password:
          </label>
          <input
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

        <div className="form-group">
          <label htmlFor="repeatPassword">
            Repeat Password:
          </label>
          <input
            type="password"
            placeholder="repeat password"
            id="repeatPassword"
            onChange={(e) => setRepeatPassword(e.target.value)}
            value={repeatPassword}
            required
          />
          <br></br>
          {errs.password && <span className="warn">{errs.password}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="firstname">
            Firstname:
          </label>
          <input
            type="text"
            placeholder="your first name"
            id="firstname"
            autoComplete="off"
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
            required
          />
          <br></br>
          {errs.firstname && <span className="warn">{errs.firstname}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="lastname">
            Lastname:
          </label>
          <input
            type="text"
            placeholder="your last name"
            id="lastname"
            autoComplete="off"
            onChange={(e) => setLastname(e.target.value)}
            value={lastname}
            required
          />
          <br></br>
          {errs.lastname && <span className="warn">{errs.lastname}</span>}
        </div>
        <div className="form-group">
        <button
          type="submit"
          className="btn"
          id="submit"
          onClick={submit}
          >
          Register
        </button>
        </div> </>)}

        {msg && <span className="suc">{msg}</span>}
        <div className="form-group">
          <Link to="/login">
            Login Page
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
