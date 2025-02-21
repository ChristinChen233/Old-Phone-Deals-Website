import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../utils/constant";
import "./PhoneList.css";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "universal-cookie";

const PhoneListing = () => {
  const cookies = new Cookies();
  const currentUser = cookies.get("currentUser");

  const [phoneLists, setPhoneLists] = useState([]);
  const [inputPhoneList, setInputPhoneList] = useState("");
  const [brand, setBrand] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${baseURL}/getAllPhoneList?enable=true`)
      .then((res) => {
        setPhoneLists(res.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

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
       // console.log(response.data, phone._id, phone.title);
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/login");
    }
  };

  //For dropdown filter based on brand
  const handleSelectChange = (e) => {
    setBrand(e.target.value);
  };

  //Filter phone lists based on selected brand
  const filteredPhoneLists = phoneLists.filter((phone) => {
    if (brand === "") {
      return true;
    }
    return phone.brand.toLowerCase() === brand.toLowerCase();
  });

  //Filter phone lists based on inputPhoneList
  const searchedPhoneLists = filteredPhoneLists.filter((phone) => {
    if (inputPhoneList === "") {
      return true;
    }
    return phone.title.toLowerCase().includes(inputPhoneList.toLowerCase());
  });

  return (
    <div>
      <section className="section-phonelisting container">
        <h2>Phone Lists</h2>

        <div className="input-container">
          <div>
            <select
              id="dropdown"
              value={brand}
              onChange={handleSelectChange}
              className="input-phone">
              <option value="" selected>
                -- Please Select Brand--
              </option>
              <option value="samsung">Samsung</option>
              <option value="apple">Apple</option>
              <option value="lg">LG</option>
              <option value="huawei">Huawei</option>
              <option value="sony">Sony</option>
              <option value="blackberry">BlackBerry</option>
              <option value="nokia">Nokia</option>
              <option value="motorola">Motorola</option>
              <option value="htc">HTC</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Enter phone name"
            className="input-phone input-phone-name"
            value={inputPhoneList}
            onChange={(e) => setInputPhoneList(e.target.value)}
          />
        </div>

        <div className="flex-container">
          {searchedPhoneLists
            .filter((phone) => phone.enable) // Filter only enabled phones
            .filter((phone) => phone.stock > 0)
            .map((phone) => (
              <div className="phone-details" key={phone._id}>
                <img src={phone.image} alt={phone.title}></img>
                <Link className="phone-link" to={`/phone/${phone._id}`}>
                  <b>{phone.title}</b>
                </Link>
                <p>{phone.brand}</p>
                <p>$ {phone.price}</p>
                <div className="flex-container btn-container">
                  <button
                    onClick={() => handleAddToCart(phone)}
                    type="button"
                    className="btn btn-yellow">
                    Add to Cart
                  </button>
                  <Link to={`/phone/${phone._id}`} className="btn btn-blue">
                    Details
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default PhoneListing;
