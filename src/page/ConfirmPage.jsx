import React, { useEffect, useState } from "react";
import "./OrderStatusPage.css";
import useAuth from "../hooks/useAuth";
import api from "../components/utils/requestAPI";

const ConfirmPage = () => {
  const { auth } = useAuth();
  // const products = [
  //   'Lồng 1',
  //   'Lồng 2',
  //   'Lồng 3',
  // ]

  const [order, setOrder] = useState(null);
  const [user, setUser] = useState(null);

  const fetchData = async () => {
    const url = "/api/Order/get-paid";
    const data = {
      userID: auth?.user?.userId,
    };
    try {
      const response = await api.post(url, data);
      console.log(response.data);
      setOrder(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [auth]);

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

  if (order?.length > 0) {
    return (
      <div className="confirm-page">
        <h1 className="confirm-page-title">Danh sách đơn hàng</h1>
        <div className="confirmed-orders">
          {order?.map((detail) => {
            let fname = "";
            let phoneNumber = "";
            let address = "";
            getUserInformation(detail?.userId);
            if (detail.note !== "string") {
              const infoArray = detail.note.split(" ");
              fname = infoArray[0];
              phoneNumber = infoArray[1];
              address = infoArray.slice(2).join(" ");
            }
            return (
              <div key={detail.orderId} className="confirmed-order">
                <h3 className="confirmed-order-id">
                  Mã đơn hàng: {detail.orderId}
                </h3>
                <div className="confirmed-order-detail">
                  {detail.note !== "string" ? (
                    <div className="confirmed-order-customer-info-section">
                      <p>Tên khách hàng: {fname}</p>
                      <p>Số điện thoại: {phoneNumber}</p>
                      <p>Địa chỉ: {address}</p>
                    </div>
                  ) : (
                    <div className="confirmed-order-customer-info-section">
                      <p>Tên khách hàng: {user?.fullName}</p>
                      <p>Số điện thoại: {user?.phoneNumber}</p>
                      <p>Địa chỉ: {user?.address}</p>
                    </div>
                  )}
                  <div className="confirmed-order-product">
                    {detail?.orderDetail?.map((item) => (
                      <p className="confirmed-order-product-name">
                        {item.product?.productName}
                      </p>
                    ))}
                  </div>
                  <div className="confirmed-order-price-status">
                    <p className="confirmed-order-price">₫{detail.total}</p>
                    {detail?.orderDetail?.map((item) => {
                      if (item.status) {
                        return (
                          <p className="confirmed-order-status">
                            Trạng thái: Đang gửi đến
                          </p>
                        );
                      }
                      if (detail.status) {
                        return (
                          <p className="confirmed-order-status">
                            Trạng thái: Đã thanh toán
                          </p>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="confirm-page">
        <h1 className="confirm-page-title">Danh sách đơn hàng đã xác nhận</h1>
        <div className="confirmed-orders">
          <div className="empty-cart-confirm">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/bscswp.appspot.com/o/localImage%2Fempty-cart.png?alt=media&token=477cd9aa-45ba-44a1-ba8c-6623fc2c8e87"
              alt="empty-cart"
              className="empty-cart-confirm-img"
            />
            <h3 className="empty-cart-confirm-text">
              Bạn chưa thêm sản phẩm vào giỏ hàng
            </h3>
          </div>
        </div>
      </div>
    );
  }
};

export default ConfirmPage;
