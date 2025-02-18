import React from "react";
import { useState } from "react";
import "./PhoneList.css";

/**
 *
 * props : {review: review}
 *
 */

const CommentCard = (props) => {
  const [showLess, setShowLess] = useState(false);
  const commentToShow =
    props.review.comment.length > 200
      ? showLess
        ? props.review.comment
        : `${props.review.comment.substring(0, 200)}...`
      : props.review.comment;

  return (
    <tr className="comments" key={props.review._id}>
      <td
        className="left-par"
        style={{
          whiteSpace: "pre-wrap",
          overflowWrap: "break-word",
        }}>
        {/* {index}<br></br> */}

        {props.review.comment.length > 200 ? (
          <div>
            {commentToShow}
            {props.review.comment.length > 200 && (
              <button
                type="button"
                className="showmore-btn"
                onClick={() => {
                  setShowLess(!showLess);
                }}>
                {showLess ? "Show less" : "Show more"}
              </button>
            )}

            <br />
          </div>
        ) : (
          props.review.comment
        )}
      </td>
      <td>{props.review.rating}</td>
      <td>{props.review.reviewerName}</td>
    </tr>
  );
};
export default CommentCard;
