import React from "react";
import { useState } from "react";
import "./PhoneList.css";

/**
 *
 * props : {review: review}
 *
 */
// Use React.memo to prevent unnecessary updates: avoid re-renders the parent re-renders
const CommentCard = React.memo(({ review }) => {
  const [showLess, setShowLess] = useState(true);
  
  return (
    <tr className="comments" key={review._id}>
      <td className="left-par" style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>
        {review.comment.length > 200 ? (
          <>
            {!showLess ? review.comment : `${review.comment.substring(0, 200)}...`}
            <button
              type="button"
              className="showmore-btn"
              onClick={() => setShowLess(!showLess)}
            >
              {showLess ? "Show more" : "Show less"}
            </button>
          </>
        ) : (
          review.comment
        )}
      </td>
      <td>{review.rating}</td>
      <td>{review.reviewerName}</td>
    </tr>
  );
});

export default CommentCard;
