import { useState } from "react";
import axios from "axios";
import { baseURL } from "../../utils/constant";
import { Link } from "react-router-dom";
import "./PhoneList.css";
import Cookies from "universal-cookie";

const AddCommentForm = (props) => {
  const cookies = new Cookies();
  const currentUser = cookies.get("currentUser");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);

  const handleAddComment = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseURL}/add-comment`, {
        phoneId: props.phone_id,
        rating: rating,
        comment: comment,
        currentUserId: currentUser.userId, // Assuming `currentUser` contains the `userId` property
      });

      //console.log(response.data.data);
      alert("Successfully submitted your comments!");
      const newComment = response.data.data; // Assuming response contains new comment
      props.setReviews((prevReviews) => [newComment, ...prevReviews]); // Add new comment at the top
      // Reset form fields
      setRating("");
      setComment("");
      setError(null);
    } catch (error) {
      console.log(error, e);
      setError("An error occurred while submitting the comment.");
      // Handle error response or display an error message
    }
  };

  if (currentUser) {
    return (
      <form onSubmit={handleAddComment} className="add-comment-container">
        {error && <p className="error">{error}</p>}
        <label>Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="comment-textarea"
          required
        />
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
          placeholder="Rate 1 - 5"
          className="comment-number"
          required
        />
        <button type="submit" className="btn btn-blue">
          Submit
        </button>
      </form>
    );
  } else {
    return (
      <div className="add-comment-container">
        <strong>
          Please{" "}
          <Link to="/login" className="login-link">
            Login
          </Link>{" "}
          to add comment
        </strong>
      </div>
    );
  }
};

export default AddCommentForm;
