// Cart.js
import React from "react";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Modal, Button } from "react-bootstrap";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, settotalPrice] = useState("");
  const [resturantDetails, setResturantDetails] = useState([]);
  const [userAddress, setUserAddress] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [customValue, setCustomValue] = useState("");
  const [amount, setAmount] = useState(0);
  const [dropdownValues, setDropdownValues] = useState([
    "Option 1",
    "Option 2",
    "Option 3",
  ]);

  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const handleAddAddress = async () => {
    await axios
      .post(
        `http://localhost:3000/api/auth/auth/addadress/6520a9ef65944c14b611eac5`,
        address
      )
      .then((data) => {
        // Handle the response data, e.g., show a success message or update the UI
        console.log("Address added successfully!", data);
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message to the user
        console.error("Error:", error);
      });
    setShowModal(false);
    // Reset the custom value input
    setCustomValue("");
  };
  const removeFromCart = () => {
    alert("jkdk");
  };
  const removeQuantity = async (e) => {
    const updatedData = {
      user: "6471c5f0814400a65fe0b97a",
      itemId: "65092bf02bbbb845aa0f5675",
      quantity: "-1",
    };
    await axios
      .post("http://localhost:3000/api/client/cart/updatecart", updatedData)
      .then((data) => {
        fetchItems();
      })
      .catch((error) =>
        console.error("Error fetching restaurant data:", error)
      );
  };
  const addQuantity = async (e) => {
    const updatedData = {
      user: "6471c5f0814400a65fe0b97a",
      itemId:
        e.target.parentElement.parentElement.parentElement.parentElement
          .parentElement.id,
      quantity: "1",
    };
    await axios
      .post("http://localhost:3000/api/client/cart/updatecart", updatedData)
      .then((data) => {
        fetchItems();
      })
      .catch((error) =>
        console.error("Error fetching restaurant data:", error)
      );
  };
  const fetchItems = async () => {
    await axios
      .get(
        "http://localhost:3000/api/client/cart/cartdetails/6520a9ef65944c14b611eac5"
      )
      .then((data) => {
        setCartItems(data.data.cart[0].items);
        settotalPrice(data.data.totalPrice);
        setAmount(data.data.totalPrice);
        setUserAddress(data.data.userAddress.address);
        console.log(data);
      })
      .catch((error) =>
        console.error("Error fetching restaurant data:", error)
      );
  };

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/client/payment/createpayment",
        { totalPrice }
      );
      const { data } = response;
      const options = {
        key: "rzp_test_B9Kp1l2gfycDVq",
        amount: data.amount,
        currency: data.currency,
        name: "Zomato",
        description: "Payment for your order",
        order_id: data.id,
        handler: function (response) {
          // Handle successful payment
          console.log(response);
        },
        prefill: {
          name: "User Name",
          email: "user@example.com",
          contact: "1234567890",
        },
        theme: {
          color: "#528FF0",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    // Fetch restaurant items from Zomato's API
    // Replace this with your actual API fetching logic
    const resturantDetails = async () => {
      await axios
        .get(
          "http://localhost:3000/api/restaurant/restaurant/findResturant/64ea232159572c6c8732d015"
        )
        .then((data) => {
          setResturantDetails(data.data[0]);
          console.log(data);
        })
        .catch((error) =>
          console.error("Error fetching restaurant data:", error)
        );
    };
    resturantDetails();
    fetchItems();
  }, [showModal]);

  const handleAddValue = () => {
    setShowModal(true);
  };
  const handleDropdownChange = (e) => {
    const selectedOption = e.target.value;
    setSelectedValue(selectedOption);

    if (selectedOption === "Add") {
      setShowModal(true);
    }
  };
  const handleModalClose = () => {
    setShowModal(false);
    // Reset the custom value input
    setCustomValue("");
  };

  const handleModalSave = () => {
    // Handle saving the address here
    // ...
    // Close the modal after saving
    setShowModal(false);
    // Reset the custom value input
    setCustomValue("");
  };

  return (
    <div className="cart">
      <h2>{resturantDetails.name}</h2>
      <div className="discount my-3 px-3 py-1 rounded">
        🥳 You saved &#x20B9;64 on this order{" "}
      </div>
      <div
        className="text-center my-2"
        style={{ fontWeight: "600", fontSize: "12px" }}
      >
        ITEM(S) ADDED
      </div>
      <div>
        <select
          value={selectedValue}
          onChange={handleDropdownChange}
          className="p-1 rounded w-100 "
        >
          {userAddress.map((option, index) => (
            <option key={index} value={option.street}>
              {option.street},{option.city}
              {option.state}, {option.zipcode}
            </option>
          ))}
          <option value="Add">Add</option>
        </select>{" "}
      </div>
      <ul className="">
        {cartItems.map((item, index) => (
          <li key={index} id={item.menuItem._id}>
            <div className="item-details">
              <div className="item-info">
                <div className="item-header">
                  <h6>{item.menuItem.name}</h6>
                </div>
                <p>
                  {" "}
                  Total Price : &#x20B9;
                  {item.menuItem.price * item.quantity}
                </p>
              </div>
              <div className="item-image">
                <img src={item.menuItem.img_url} alt={item.menuItem.name} />
                <div className="col-12 row mx-0 px-0">
                  <div className="col-4 px-0">
                    {" "}
                    <button
                      className="add-button mt-2 mx-2 px-2 py-0 rounded-0"
                      onClick={addQuantity}
                    >
                      +
                    </button>
                  </div>
                  <div className="col-4 px-0 text-center pt-2">
                    {" "}
                    <span>{item.quantity}</span>
                  </div>
                  <div className="col-4 px-0">
                    {" "}
                    <button
                      className="add-button mt-2 mx-2 px-2 py-0 rounded-0"
                      onClick={removeQuantity}
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="row">
        {" "}
        <div>
          {" "}
          <p
            className=" mb-0 float-end text-success w-auto "
            style={{ fontWeight: "700" }}
          >
            Total Price :<span className="text-black">{totalPrice}</span>
          </p>
        </div>
        <div>
          {" "}
          <p
            className=" mb-0 float-end text-success w-auto "
            style={{ fontWeight: "700" }}
          >
            GST Rate :<span className="text-black">18%</span>
          </p>
        </div>
      </div>
      <div>
        {" "}
        <button className="px-5 py-2 rounded-2" onClick={handlePayment}>
          Pay
        </button>
      </div>
      {/* Bootstrap Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <input
              type="text"
              placeholder="Street"
              value={address.street}
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="City"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />
            <input
              type="text"
              placeholder="State"
              value={address.state}
              onChange={(e) =>
                setAddress({ ...address, state: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Zip Code"
              value={address.zipCode}
              onChange={(e) =>
                setAddress({ ...address, zipCode: e.target.value })
              }
            />
            <button onClick={handleAddAddress}>Add</button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddAddress}>
            Save Address
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer></Footer>
    </div>
  );
};

export default Cart;
