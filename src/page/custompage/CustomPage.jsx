import React, { useEffect, useState } from "react";
import "./CustomPage.css";
import PopupModal from "../../components/modal/PopupModal";
import useAuth from "../../hooks/useAuth";
import api from "../../components/utils/requestAPI";
import { useNavigate } from "react-router-dom";

const CustomPage = () => {
  const { auth } = useAuth();

  const [name, setName] = useState("");
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const fetchUserOrder = async () => {
    const url = `/api/Order/get-custom-order`;
    const data = {
      userID: auth?.user?.userId,
    };
    try {
      const responseOrder = await api.post(url, data);
      if (responseOrder.data.length > 0) {
        navigate(
          `/custom-products-end/${responseOrder.data[0].orderId}/${responseOrder.data[0].orderDetail[0].productId}`
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserOrder();
  }, [order]);

  const handleButtonClick = async (event) => {
    event.preventDefault();
    const url = "/api/ProductCustom/create-custom";
    console.log(auth);
    const data = {
      userId: auth?.user?.userId,
      productName: name,
    };

    // Set loading to true
    setIsLoading(true);

    try {
      // Call the API
      const response = await api.post(url, data);

      // If the response is successful, navigate to the next page
      if (response) {
        navigate(`/custom-products-shape/${response.data.productCustomId}`);
      }

      // Set loading to false
      setIsLoading(false);
    } catch (error) {
      // Handle the error
      console.error(error);
    }

    // If the request is still loading, prevent the user from clicking the button again
    if (isLoading) {
      return;
    }
  };

  return (
    <div className="custom-page">
      <h1 className="custom-page-welcome">
        Chào mừng bạn đến với trang trí lồng chim
      </h1>
      <h2 className="custom-page-welcome-title">
        Mời bạn đặt tên cho lồng chim của mình
      </h2>
      <div className="custom-page-input-form">
        <form className="custom-page-form" onSubmit={handleButtonClick}>
          <div className="custom-page-input-container">
            <label htmlFor="name" className="custom-page-input-container-label">
              Tên lồng chim
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="custom-page-input"
              placeholder="Nhập tên lồng chim"
              required
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <button type="submit" className="choose-button">
            Xác nhận
          </button>
        </form>
      </div>
      <PopupModal />
    </div>
  );
};

export default CustomPage;
