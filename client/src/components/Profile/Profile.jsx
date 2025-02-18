import React, { useState } from "react";
import EditProfile from "./tabs/editProfile";
import ChangePassword from "./tabs/changePassword";
import ManageListings from "./tabs/manageListings";
import ViewComments from "./tabs/viewComments";
import "./Profile.css";
import Cookies from "universal-cookie";

const Profile = () => {
  const [mode, setMode] = useState("");
  const cookies = new Cookies();
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
    return (
      <p className="profile-greeting">
        Hello, {user}, please click the navigation bar below
      </p>
    );
  };

  const Bars = ({ mode }) => {
    return (
      <div>
        <Greetings />
        <div className="profile-nav-container">
          <button
            onClick={toEditProfile}
            className={`profile-nav-btn ${mode === "edit-profile" ? "profile-nav-btn-blue" : ""}`}
          >
            Edit Profile
          </button>
  
          <button
            onClick={toChangePsw}
            className={`profile-nav-btn ${mode === "change-psw" ? "profile-nav-btn-blue" : ""}`}
          >
            Change Password
          </button>
  
          <button
            onClick={toManageList}
            className={`profile-nav-btn ${mode === "manage-ls" ? "profile-nav-btn-blue" : ""}`}
          >
            Manage Phone Listings
          </button>
  
          <button
            onClick={toComments}
            className={`profile-nav-btn ${mode === "comments" ? "profile-nav-btn-blue" : ""}`}
          >
            View Comments
          </button>
        </div>
      </div>
    );
  };
  
  const renderContent = () => {
    switch (mode) {
      case "edit-profile":
        return <EditProfile />;
      case "change-psw":
        return <ChangePassword />;
      case "manage-ls":
        return (
          <>
            <h2>Manage Your Phones</h2>
            <ManageListings />
          </>
        );
      case "comments":
        return (
          <>
            <h2>Manage Your Comments</h2>
            <ViewComments />
          </>
        );
      default:
        return <EditProfile />;
    }
  };

  return (
    <div className="profile-container">
      <Bars mode={mode} />
      {renderContent()}
    </div>
  );
};

export default Profile;
