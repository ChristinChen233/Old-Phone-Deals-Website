import axios from "axios";

const baseURL = "http://3.27.235.130:8000/api";

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
