import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../utils/constant";
import Cookies from "universal-cookie";

const EmaiilVerify = () => {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();
  const cookies = new Cookies();
  const currUser = cookies.get("currentUser");

  useEffect(() => {
    const checkEmailUrl = async () => {
      try {
        const url = `${baseURL}/users/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        if (data === "invalid link") {
          setValidUrl(false);
        } else {
          setValidUrl(true);
        }
      } catch (e) {
        console.log(e);
        setValidUrl(false);
      }
    };
    checkEmailUrl();
  }, [param]);

  return (
    <div className="page-container form-container">
      <div className="form-body">
      {validUrl ? (
        <h1>
          Email verified successfully.{" "}
          {!currUser && <Link to="/login">
            Login
          </Link>}
        </h1>
      ) : (
        <h1>Link has expired! Please register your account again</h1>
      )}
      </div>
    </div>
  );
};

export default EmaiilVerify;
