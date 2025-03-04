import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../../utils/constant";
import "../../../index.css";
import "../Profile.css";
import "../../Checkout/Checkout.css";
import AddPhonelisting from "./addPhonelisting";
import Cookies from "universal-cookie";

function ManageListings() {
  const [errorMsg, setErrorMsg] = useState("");
  const [phones, setPhones] = useState(null);
  const cookies = new Cookies();
  const currentUser = cookies.get("currentUser");
  const [addPhone, setAddPhone] = useState(false);
  const [addPhoneBtn, setAddPhoneBtn] = useState("Add new Phone");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          `${baseURL}/profile/get-phone-listings-by-user`,
          { currentUserId: currentUser.userId }
        );

       // console.log(res.data.item);
        setErrorMsg("");

        if (res.data === "no item") {
         // console.log(res.data);
          return;
        }
        if (res.data.data === "good") {
          setPhones(res.data.item);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser != null) {
      fetchData();
    }
  }, [currentUser]);

  //everytime frontend request `${baseURL}/profile/update-enable` api, backend will automatically update enable status,
  async function setEnable(phone) {
    try {
      const res = await axios.post(`${baseURL}/profile/update-enable`, {
        phone_id: phone.phone_id,
      });

      if (res.data === "no item") {
        alert("Data base has lost this phone data, please contact the admin");
        return;
      }

      console.log(res.data);

      if (res.data === "good") {
        // if backend modified, run codes below
        phone.enable = !phone.enable;
        const updatedPhones = phones.map((p) => {
          if (p === phone) {
            p.enable = phone.enable;
          }
          return p;
        });

        setPhones(updatedPhones);
        alert("Update successfully");
      }
    } catch (error) {
      console.log(error);
    }
  }

  //add remove button
  async function remove(phone) {
    try {
      const id = phone.phone_id;
     // console.log(id);
      const res = await axios.delete(`${baseURL}/profile/${id}`);

      if (res.data === "Bad delete") {
        alert("Data base has lost this phone data, please contact the admin");
        return;
      }
      if (res.data === "Delete success") {
        //update phones
        const updatedPhones = phones.filter(
          (p) => p.phone_id !== phone.phone_id
        );
        setPhones(updatedPhones);
        alert("Item removed successfully");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function triggerAddPhone() {
    if (!addPhone) {
      setAddPhoneBtn("Close");
      setAddPhone(true);
    } else {
      setAddPhoneBtn("Add new Phone");
      setAddPhone(false);
    }
  }

  return (
    <div className="manage-user-container">
      {errorMsg && <h1>{errorMsg}</h1>}
      <br></br>
      <div className="add-list-box">
        <button
          onClick={triggerAddPhone}
          className="btn btn-yellow btn-margin-bottom">
          {addPhoneBtn}
        </button>
        {addPhone ? (
          <div>
            <AddPhonelisting />
          </div>
        ) : (
          <div>
            <br></br>
          </div>
        )}
      </div>
      {phones && phones.length > 0 ? (
        <div className="flex-container">
          {phones.map((item, index) => (
            <div key={index} className="profile-phone-container">
              <img src={`./imgs/${item.brand}.jpeg`} alt={item.title}></img>
              <div>
                <Link
                  to={`/phone/${item.phone_id}`}
                  className="checkout-heading">
                  <p>{item.title}</p>
                </Link>
                <p>
                  Brand: <strong>{item.brand}</strong>
                  {/* <button className="btn btn-yellow">Change Brand</button> */}
                </p>
                <p>
                  Price: <strong>{item.price}</strong>
                  {/* <button className="btn btn-yellow">Change Price</button> */}
                </p>
                <p>
                  Stock: <strong>{item.stock}</strong>
                  {/* <button className="btn btn-yellow">Change Stock</button> */}
                </p>
                <p>
                  Current Status:{" "}
                  {item.enable ? (
                    <strong>Display to Public </strong>
                  ) : (
                    <strong>Hide from Public </strong>
                  )}{" "}
                  <button
                    onClick={() => setEnable(item)}
                    className="btn btn-green">
                    {item.enable ? "Disable" : "Enable"}
                  </button>
                </p>
                <div className="flex-container btn-container">
                  <button className="btn btn-yellow"> Edit this Phone</button>{" "}
                  <button onClick={() => remove(item)} className="btn btn-red">
                    Remove this Phone
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>There is no phone belongs to you</p>
        </div>
      )}
    </div>
  );
}

export default ManageListings;
