import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseURL } from "../../../utils/constant";
import "../../../index.css";
import "../Profile.css";
import "../../Checkout/Checkout.css";
import Cookies from "universal-cookie";

function ViewComments() {
  const [errorMsg, setErrorMsg] = useState("");
  const [comments, setComments] = useState(null);
  const cookies = new Cookies();
  const currentUser = cookies.get("currentUser");

  useEffect(() => {
    const fetchData = async () => {
      //
      try {
        const res = await axios.get(
          `${baseURL}/profile/get-comments-by-user?currentUserId=${currentUser.userId}`
        );

       // console.log(res.data.comments);
        setErrorMsg("");
        /*
                res.data.comments should be in format below
                [
                    {
                        revfiewerFirstName: String,
                        rating: Number,
                        comment: String,
                        hidden: Boolean,
                        brand: the phone brand of this comment left
                        title: the phone title of this comment left
                        comment_id: object id (in string type) of this current comment //change to index
                    },
                ],
            */
        if (res.data === "no item") {
         //.log(res.data);
          // alert("something went wrong, please login again");
          setErrorMsg("something went wrong, please login again");
          return;
        }
        if (res.data.data === "good") {
          setComments(res.data.comments);
        }
      } catch (error) {
        console.log(error);
        setErrorMsg("Server Error!");
      }
    };

    if (currentUser != null) {
      fetchData();
    }
  }, [currentUser]);

  async function setHidden(comment) {
    const res = await axios.post(`${baseURL}/profile/update-hidden`, {
      phonelisting_id: comment.phoneListingId, //the String type of phonelisting id
      comment_id: comment.comment_id, // comment_id is the index of comment in the reviews array of the phonelisting
    });

    if (res.data === "update failed") {
      alert("hidden comment failed, please try again");
    }

    if (res.data === "update success") {
      // if backend modified, run codes below
      if (comment.hidden) {
        comment.hidden = false;
        comment.hiddenBtn = "hide";
      } else {
        comment.hidden = true;
        comment.hiddenBtn = "show";
      }

      const updatedComments = comments.map((p) => {
        if (p.comment_id === comment.comment_id) {
          p.hidden = comment.hidden;
          p.hiddenBtn = comment.hiddenBtn;
        }
        return p;
      });
      setComments(updatedComments);
      alert("Update successfully");
    }
  }

  return (
    <div>
      {errorMsg && <p>{errorMsg}</p>}
      {comments && comments.length > 0 ? (
        <div>
          <h3>Comments Left to You</h3>
          <br></br>
          {comments.map((item, index) => {
            return (
            <div key={index} className="manage-comments-container">
              <img src={`./imgs/${item.brand}.jpeg`} alt={item.title}></img>
              <div className="profile-comments-right">
                <Link
                  to={`/phone/${item.phoneListingId}`}
                  className="checkout-heading">
                  {item.title}
                </Link>
                <p>
                  <strong>Rating: </strong>
                  {`${item.rating} `}
                </p>
                <p className="profile-comments">{item.comment}</p>
                <strong>Reviewed by: {item.reviewerFirstName}</strong>
                <p>
                  Current Status:{" "}
                  {!item.hidden ? (
                    <strong>Display to Public </strong>
                  ) : (
                    <strong>Hide from Public </strong>
                  )}
                  <button
                    className="btn btn-green"
                    onClick={() => setHidden(item)}>
                    {item.hidden ? "Set to Public" : "Hide"}
                  </button>
                </p>
              </div>
              <br></br>
            </div>
          )})}
        </div>
      ) : (
        <div>
          <p>There is no comment left to you</p>
        </div>
      )}
    </div>
  );
}

export default ViewComments;
