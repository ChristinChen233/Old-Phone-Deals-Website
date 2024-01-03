import React, { useState } from "react";
import EditProfile from "./tabs/editProfile";
import ChangePassword from "./tabs/changePassword";
import ManageListings from "./tabs/manageListings";
import ViewComments from "./tabs/viewComments";
import "./Profile.css";
import Cookies from "universal-cookie";

const Profile = () => {
  const [mode, setMode] = useState("");
  const cookies = new Cookies;
  const user = cookies.get("currentUser")?.email;

  function toEditProfile() {
    setMode("edit-profile");
  }

  function toChangePsw() {
    setMode("change-psw");
  }
  function toManageList() {
    setMode("manage-ls");
  }
  function toComments() {
    setMode("comments");
  }

  const Greetings = () => {
    return (<p className="profile-greeting">
    Hello, {user}, please click the navigation bar below
  </p>)
  }

  const Bars = () => {
    return (
      <div> 
        <Greetings></Greetings>
        <div className= "profile-nav-container">
        <button onClick={toEditProfile} className="profile-nav-btn">
          Edit Profile
        </button>
        <button onClick={toChangePsw} className="profile-nav-btn">
          Change Password
        </button>
        <button onClick={toManageList} className="profile-nav-btn">
          Manage Phone listings
        </button>
        <button onClick={toComments} className="profile-nav-btn">
          View comments
        </button>
        </div>
      </div>
    )
  }

  if (mode === "edit-profile") {
    return (
      <div className="profile-container">
        <Bars />
        <EditProfile />
      </div>
    );
  }

  if (mode === "change-psw") {
    return (
      <div className="profile-container">
        <Bars />
        <ChangePassword />
      </div>
    );
  }

  if (mode === "manage-ls") {
    return (
      <div className="profile-container">
        <Bars />
        <h2>Manage Your Phones</h2>
        <ManageListings />
      </div>
    );
  }

  if (mode === "comments") {
    return (
      <div className="profile-container">
        <Bars />
        <h2>Manage Your Comments</h2>
        <ViewComments />
      </div>
    );
  }

  return (
    <div className="profile-container">
      <Bars />
      <EditProfile />
    </div>
  );
};

export default Profile;
