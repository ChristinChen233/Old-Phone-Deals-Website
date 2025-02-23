import axios from "axios";

const baseURL = "https://backendapi.oldphonedeal.online/api";
//const baseURL = "http://localhost:8000/api";

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
