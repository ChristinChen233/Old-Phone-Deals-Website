import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { baseURL } from "../../utils/constant";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "universal-cookie";
import "./PhoneList.css";

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
      .then((res) => setPhoneLists(res.data.data))
      .catch(console.error);
  }, []);

  const handleAddToCart = async (phone) => {
    //add code to prevent event propogate to parent element
    if (!currentUser) {
      navigate("/login");
      return;
    }

    try {
      let quantity = parseInt(window.prompt("Enter quantity:", "1"), 10);

      if (isNaN(quantity) || quantity <= 0 || quantity > 999) {
        alert("Please enter a valid integer between 1 and 999.");
        return;
      }

      const response = await axios.post(`${baseURL}/checkout/add-to-cart`, {
        userId: currentUser.userId,
        phone_id: phone._id,
        title: phone.title,
        num: quantity,
        price: phone.price,
        brand: phone.brand,
      });

      if (response.data.data === "Bad stock") {
        alert(response.data.msg);
      }

      if (response.data.status === "ok") {
        //console.log('added')
        alert('Added to Cart');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Filtered phone lists
  const searchedPhoneLists = useMemo(() => {
    return phoneLists
      .filter((phone) => phone.enable && phone.stock > 0)
      .filter((phone) => !brand || phone.brand.toLowerCase() === brand.toLowerCase())
      .filter((phone) => !inputPhoneList || phone.title.toLowerCase().includes(inputPhoneList.toLowerCase()));
  }, [phoneLists, brand, inputPhoneList]);

const PhoneCard = ({ phone, handleAddToCart }) => {
  const handleCardClick = () => {
    navigate(`/phone/${phone._id}`);
  };
  return (
    <div className="phone-details" onClick={handleCardClick}>
      <img src={phone.image} alt={phone.title} />
      <b className="phone-link">{phone.title.length > 100 ? phone.title.substring(0, 100)+'...' : phone.title}</b>
      <p>{phone.brand}</p>
      <p>$ {phone.price}</p>
      <div className="flex-container btn-container">
        <button onClick={(e) => {e.stopPropagation(); handleAddToCart(phone);}} className="btn btn-yellow">
          Add to Cart
        </button>
        <Link to={`/phone/${phone._id}`} className="btn btn-blue" onClick={(e) => e.stopPropagation()}>
          Details
        </Link>
      </div>
    </div>
  );
};


  return (
    <div>
      <section className="section-phonelisting container page-container">
        <h2>Phone Lists</h2>

        <div className="input-container">
          <select value={brand} onChange={(e) => setBrand(e.target.value)} className="input-phone">
            <option value="">-- Please Select Brand --</option>
            {["Samsung", "Apple", "LG", "Huawei", "Sony", "BlackBerry", "Nokia", "Motorola", "HTC"].map((b) => (
              <option key={b} value={b.toLowerCase()}>{b}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Enter phone name"
            className="input-phone input-phone-name"
            value={inputPhoneList}
            onChange={(e) => setInputPhoneList(e.target.value)}
          />
        </div>

        <div className="flex-container">
        {searchedPhoneLists.map((phone) => (
          <PhoneCard key={phone._id} phone={phone} handleAddToCart={handleAddToCart} />
        ))}
        </div>
      </section>
    </div>
  );
};

export default PhoneListing;
