const PhoneListModel = require("../model/PhoneListModel");
const UserListModel = require("../model/userlist");
const mongoose = require("mongoose");

module.exports.getPhoneLists = async (req, res) => {
  try {
    const phones = await PhoneListModel.find({});
    //console.log(phones)
    const { phoneId } = req.params;
    const updatedPhones = phones.map((phone) => {
      phone.image = "./imgs/" + phone.brand + ".jpeg";
      // phone.phone_id = phone._id;
      let sum = 0;
      let count = 0;
      if (phone.reviews.length >= 3) {
        for (var i = 0; i < phone.reviews.length; i++) {
          const review = phone.reviews[i];
          if (review.phoneId === phoneId) {
            sum += review.rating;
            count++;
          }
        }
        if (count > 0) {
          phone.averageRating = sum / count;
        } else {
          phone.averageRating = 0;
        }
      } else {
        phone.averageRating = 0;
      }
      return phone;
    });
    const result = await Promise.all(updatedPhones);
    res.send({ status: "ok", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", message: "Internal server error" });
  }
};

module.exports.getPhoneListsById = async (req, res) => {
  try {
    const phoneId = req.params.id;
    const phone = await PhoneListModel.findById(phoneId);
    const user = await UserListModel.findById(phone.seller);
    if (user) {
      phone.sellerName = user.firstname + " " + user.lastname;
    }

    const updatedReviews = phone.reviews.map(async (review) => {
      const reviewer = await UserListModel.findById(review.reviewer);
      if (reviewer) {
        review.reviewerName = reviewer.firstname + " " + reviewer.lastname;
      }
      return review;
    });

    phone.reviews = await Promise.all(updatedReviews);
    res.send({ status: "ok", data: phone });
  } catch (error) {
    console.log(error);
    res.send({ status: "error", message: "Failed to get phone list by id" });
  }
};

module.exports.addComment = async (req, res) => {
  const { phoneId, rating, comment, currentUserId } = req.body;

  try {
    const phone = await PhoneListModel.findById(phoneId);
    const user = await UserListModel.findById(currentUserId);

    if (!phone || !user) {
      return res
        .status(404)
        .send({ status: "error", message: "Phone or user not found" });
    }
    const newReview = {
      _id: new mongoose.Types.ObjectId(), // Assign a unique ObjectId to the review
      reviewUploadTime: new Date(), // Store the current timestamp
      reviewer: currentUserId, 
      reviewerName: user.firstname + " " + user.lastname,
      rating,
      comment,
      hidden: false, // Default to visible
    };

    // Add new review to the beginning of the reviews array
    phone.reviews.unshift(newReview);
    await phone.save();
    res.send({ status: "ok", data: newReview });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", message: "Internal server error" });
  }
};
