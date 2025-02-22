import axios from "axios";

const baseURL = "https://backendapi.oldphonedeal.online/api";

const listData = (URL, callback) => {
  axios
    .get(URL)
    .then((res) => {
      callback(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export { baseURL, listData };
