import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../utils/constant";
import "./PhoneList.css";
import AddCommentForm from "./AddComment";
import { useNavigate, useParams } from "react-router-dom";
import CommentCard from "./CommentCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "universal-cookie";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const PhoneDetail = () => {
  const cookies = new Cookies();
  const currentUser = cookies.get("currentUser");
  const param = useParams();
  const [phone, setPhone] = useState(null);
  const navigate = useNavigate();
  const [visibleReviews, setVisibleReviews] = useState(3);

  useEffect(() => {
    const getPhone = async () => {
      try {
        const url = `${baseURL}/getPhoneList/${param.phoneid}`;
        const res = await axios.get(url);
        if (res.data.status === "ok") {
          setPhone(res.data.data);
          // res.data.data.reviews.filter((elem))
        //  console.log(phone);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getPhone();
  }, [param.phoneid]);//Modify your useEffect to run only when param.phoneid changes:

  const handleAddToCart = async (phone) => {
    if (currentUser) {
      try {
        const quantity = parseInt(window.prompt("Enter quantity:", "1"), 10);
        if (quantity === null || quantity === "") {
          return;
        }
        if (quantity.length >= 3) {
          window.alert("Please specify integer only within the scope (0, 999]");
          return;
        }
        for (let i = 0; i < quantity.length; i++) {
          if (parseInt(quantity[i]) == null) {
            window.alert(
              "Please specify integer only within the scope (0, 999]"
            );
            return;
          }
        }
        if (isNaN(quantity) || quantity <= 0) {
          alert("You must input integer larger than 0");
          return; // Exit if the quantity is not valid
        }
        if (quantity <= phone.stock) {
          alert("Successfully add to Cart");
          const response = await axios.post(`${baseURL}/checkout/add-to-cart`, {
            userId: currentUser.userId,
            phone_id: phone._id,
            title: phone.title,
            num: quantity, // assuming that you always add one phone to the cart
            price: phone.price,
            brand: phone.brand,
          });

          if (response.data.data === "Bad stock") {
            alert(response.data.msg);
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/login");
    }
  };
  const handleShowMore = () => {
   // setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 5);
    setVisibleReviews((prev) => Math.min(prev + 5, phone.reviews.length)); // Load 3 at a time
  };

  const handleShowLess = () => {
    setVisibleReviews(3);
  };

  const handleDeleteComment = () => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this comment?",
      buttons: [
        {
          label: "Yes",
          onClick: () => DeleteComment(),
        },
        {
          label: "No",
          //onClick: () => alert('Click No')
        },
      ],
    });
  };

  const DeleteComment = () => {};

  return (
    <div>
      {phone ? (
        <div className="phone">
          <div className="phone-detail-container">
            <img
              src={require(`../../../public/imgs/${phone.brand}.jpeg`)}
              alt={phone.title}
            />
            <div className="details">
              <h3 className="phone-title">{phone.title}</h3>
              <p className="left-par">
                Brand: <strong>{phone.brand}</strong>
              </p>
              <p className="left-par">
                Price: <strong>$ {phone.price}</strong>
              </p>
              {/* <p className="left-par">Stock: {phone.stock}</p> */}
              <p className="left-par">
                Seller: <strong>{phone.sellerName}</strong>
              </p>
              <p className="left-par">
                Average Rating:{" "}
                <strong>
                  {phone.reviews.length > 0
                    ? Math.round(
                        (phone.reviews.reduce(
                          (sum, curr) => sum + Number(curr.rating),
                          0
                        ) /
                          phone.reviews.length) *
                          10
                      ) / 10
                    : "No rating yet"}{" "}
                </strong>
              </p>

              <button
                onClick={() => handleAddToCart(phone)}
                type="button"
                className="btn btn-yellow">
                Add to Cart
              </button>
            </div>
          </div>
          <br></br>
          <div className="comment-container">
            <h2>Reviews</h2>
            <AddCommentForm phone_id={phone._id} />
            <br></br>
            {phone.reviews.length > 0 ? (
              <div>
                <table className="comment-table">
                  <thead>
                    <tr>
                      <th>Comments</th>
                      <th>Rating</th>
                      <th>Reviewer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {phone.reviews.slice(0, visibleReviews).map((review) => {
                      return (
                          <CommentCard review={review}></CommentCard>
                      );
                    })}
                  </tbody>
                </table>
                {visibleReviews < phone.reviews.length && (
                  <button
                    onClick={() => {
                      handleShowMore();
                    }}
                    className="btn btn-green">
                    Show more Comments
                  </button>
                )}
                {visibleReviews >= phone.reviews.length &&
                  phone.reviews.length > 5 && (
                    <button
                      className="btn btn-red"
                      onClick={() => {
                        handleShowLess();
                      }}>
                      Show Less Comments
                    </button>
                  )}
              </div>
            ) : (
              <strong className="add-comment-container">
                No review for this phone yet
              </strong>
            )}
          </div>
        </div>
      ) : (
        <div className="phone">
          <h1>Loading.....</h1>
          <FontAwesomeIcon icon={["fas", "spin"]} />
        </div>
      )}
    </div>
  );
};

export default PhoneDetail;
