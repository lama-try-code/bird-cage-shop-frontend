import React, { useEffect, useState } from "react";
import "./OrderPage.css";
import { useParams } from "react-router-dom";
import api from "../../../components/utils/requestAPI";

const ViewOrderPage = () => {
  const { action } = useParams();
  const [order, setOrder] = useState(null);
  const [customOrder, setCustomOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const [name, setNames] = useState("");

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchOrder();
    fetchCustomOrder();
  }, [order, customOrder]);

  const fetchOrder = async () => {
    const url = `/api/Order/get-to-confirm`;
    setLoading(true);
    try {
      const response = await api.get(url);
      setOrder(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
    if (loading) return;
  };

  const fetchCustomOrder = async () => {
    const url = `/api/Order/get-custom-confirm`;
    setLoading(true);
    try {
      const response = await api.get(url);
      setCustomOrder(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
    if (loading) return;
  };

  const getProductById = async (id) => {
    const url = `/api/Product/get-by-id?id=${id}`;
    try {
      const response = await api.get(url);
      if (response.data != null) {
        setNames(response.data.productName);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getUserInformation = async (id) => {
    const url = `/api/User/get-user-information`;
    const data = {
      userID: id,
    };
    try {
      const response = await api.post(url, data);
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  function formatCash(currency) {
    return currency?.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const handleConfirm = async (event, id) => {
    event.preventDefault();
    const url = `/api/OrderDetail/confirm-order?orderID=${id}`;
    console.log("y");
    try {
      const response = await api.put(url);
    } catch (error) {
      console.error(error);
    }
  };

  if (action === "view-order") {
    return (
      <div className="page">
        {order?.map((item) => {
          getUserInformation(item?.userId);
          let fname = "";
          let phoneNumber = "";
          let address = "";
          if (item.note !== "string") {
            const infoArray = item.note.split(" ");
            fname = infoArray[0];
            phoneNumber = infoArray[1];
            address = infoArray.slice(2).join(" ");
          }
          return (
            <div className="order-page">
              <div className="order-product-info-section">
                {item.orderDetail?.map((product) => {
                  getProductById(product.productId);
                  if (name !== "") {
                    return <p>{name}</p>;
                  }
                })}
              </div>
              {item.note !== "string" ? (
                <div className="order-customer-info-section">
                  <p>Tên khách hàng: {fname}</p>
                  <p>Số điện thoại: {phoneNumber}</p>
                  <p>Địa chỉ: {address}</p>
                </div>
              ) : (
                <div className="order-customer-info-section">
                  <p>Tên khách hàng: {user?.fullName}</p>
                  <p>Số điện thoại: {user?.phoneNumber}</p>
                  <p>Địa chỉ: {user?.address}</p>
                </div>
              )}
              <div className="summary-section">
                <p className="summary-title">
                  Tổng tiền hàng:{" "}
                  <span className="summary-detail">
                    ₫{formatCash(item?.total)}
                  </span>
                </p>
              </div>

              <div className="finish-order">
                <button
                  type="submit"
                  className="finish-button"
                  onClick={(event) => handleConfirm(event, item.orderId)}
                >
                  Hoàn thành
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else if (action === "confirm-custom") {
    return (
      <div className="page">
        {customOrder?.map((item) => {
          getUserInformation(item?.userId);
          let fname = "";
          let phoneNumber = "";
          let address = "";
          if (item.note !== "string") {
            const infoArray = item.note.split(" ");
            fname = infoArray[0];
            phoneNumber = infoArray[1];
            address = infoArray.slice(2).join(" ");
          }
          return (
            <div className="order-page">
              <div className="order-product-info-section">
                {item.orderDetail?.map((product) => {
                  getProductById(product.productId);
                  if (name !== "") {
                    return <p>{name}</p>;
                  }
                })}
              </div>
              {item.note !== "string" ? (
                <div className="order-customer-info-section">
                  <p>Tên khách hàng: {fname}</p>
                  <p>Số điện thoại: {phoneNumber}</p>
                  <p>Địa chỉ: {address}</p>
                </div>
              ) : (
                <div className="order-customer-info-section">
                  <p>Tên khách hàng: {user?.fullName}</p>
                  <p>Số điện thoại: {user?.phoneNumber}</p>
                  <p>Địa chỉ: {user?.address}</p>
                </div>
              )}
              <div className="summary-section">
                <p className="summary-title">
                  Tổng tiền hàng:{" "}
                  <span className="summary-detail">
                    ₫{formatCash(item?.total)}
                  </span>
                </p>
              </div>
              <div className="finish-order">
                <button
                  type="submit"
                  className="finish-button"
                  onClick={(event) => handleConfirm(event, item.orderId)}
                >
                  Hoàn thành
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};

export default ViewOrderPage;
