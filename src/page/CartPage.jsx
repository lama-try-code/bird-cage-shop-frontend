import React, { useEffect, useState } from "react";
import "./CartPage.css";
import QuantityButton from "../components/button/QuantityButton";
import { FaTrashAlt } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import api from "../components/utils/requestAPI";
import { useNavigate } from "react-router-dom";
import PopupModal from "../components/modal/PopupModal";

const CartPage = () => {
  const { auth } = useAuth();
  const [cartItems, setCartItems] = useState(null);

  const [loading, setLoading] = useState(false);

  const [voucherList, setVoucherList] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [editName, setEditName] = useState("");
  const [editPhonenumber, setEditPhonenumber] = useState("");
  const [editAddress, setEditAddress] = useState("");

  const navigate = useNavigate();

  const [isEditing, setEditing] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const [isNameChange, setIsNameChange] = useState(false);
  const [isPhoneNumChange, setIsPhoneNumChange] = useState(false);
  const [isAddressChange, setIsAddressChange] = useState(false);

  const [selectVoucher, setSelectVoucher] = useState("");

  const [totalPrice, setTotalPrice] = useState(0);

  const [showPopup, setShowPopup] = useState(false);

  const [statusReturn, setStatusReturn] = useState(false);

  const handleCustomerEdit = () => {
    setEditing(true);
    setIsEditingName(true);
    setIsEditingAddress(true);
    setIsEditingPhoneNumber(true);
  };

  const handleCustomerCancel = () => {
    setEditing(false);
    setIsEditingName(false);
    setIsEditingAddress(false);
    setIsEditingPhoneNumber(false);
  };

  const handleSave = async () => {
    setEditing(false);
    setIsEditingName(false);
    setIsEditingAddress(false);
    setIsEditingPhoneNumber(false);

    if (editName && editName !== name) {
      setIsNameChange(true);
    }
    if (editPhonenumber && editPhonenumber !== phoneNumber) {
      setIsPhoneNumChange(true);
    }
    if (editAddress && editAddress !== address) {
      setIsAddressChange(true);
    }
    if (isNameChange && isPhoneNumChange && isAddressChange) {
      setName(editName);
      setPhoneNumber(editPhonenumber);
      setAddress(editAddress);

      const url = "/api/Order/update-order-to-add-product";
      const total = cartItems[0]?.total;
      let note = editName + " " + editPhonenumber + " " + editAddress;
      note.toString();
      console.log(note);
      const data = {
        orderId: cartItems[0]?.orderId,
        userId: auth.user.userId,
        note: note,
        price: total,
      };
      console.log("y");
      try {
        const response = await api.put(url, data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  //handle showPopup
  const handleShowPopup = async () => {
    setShowPopup(true);
  };

  //format money
  function formatCash(currency) {
    return currency?.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  //fetch for order
  const fetchData = async () => {
    const url = "/api/Order/get-not-paid";
    const data = {
      userID: auth.user.userId,
    };
    try {
      const response = await api.post(url, data);
      setCartItems(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDataVoucherList = async () => {
    const url = "/api/Voucher/get-for-user";
    try {
      const response = await api.get(url);
      console.log(response.data);
      setVoucherList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Remove Item
  const removeItem = async (itemId) => {
    let updatedCart;
    cartItems.map((item) => {
      item?.orderDetail.map((product) => {
        console.log(item.orderDetail);
        if (product.productId === itemId) updatedCart = product;
      });
    });
    const url = "/api/OrderDetail/remove-or-temporary";
    const data = {
      orderId: updatedCart.orderId,
      productId: updatedCart.product.productId,
    };
    console.log(data);
    try {
      const response = await api.delete(url, {
        headers: {
          "Content-Type": "application/json-patch+json",
        },
        data: JSON.stringify(data),
      });
      console.log(response.data);
      if (response) {
        const decreaseTotal = response.data.price;
        const decreaseQuantity = response.data.quantity;
        const total = cartItems[0]?.total - decreaseTotal * decreaseQuantity;
        const urlUpdate = "/api/Order/update-order-to-add-product";
        const dataUpdate = {
          orderId: response.data.orderId,
          userId: auth.user.userId,
          note: "string",
          price: total,
        };
        try {
          const updateResponse = await api.put(urlUpdate, dataUpdate);
          console.log(updateResponse.data);
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Update Quantity
  const updateQuantity = async (itemId, newQuantity) => {
    cartItems.map((item) => {
      item?.orderDetail.map(async (product) => {
        if (product.productId === itemId) {
          const url = "/api/OrderDetail/update-detail";
          const data = {
            orderId: item.orderId,
            productId: product.productId,
            quantity: newQuantity,
            status: false,
          };
          try {
            const responseOrderDetail = await api.put(url, data);
            console.log(responseOrderDetail.data);
            console.log(item.total);
            if (responseOrderDetail) {
              const urlUpdate = "/api/Order/update-order-to-add-product";
              let total = 0;
              total +=
                responseOrderDetail.data.price *
                responseOrderDetail.data.quantity;
              const data = {
                orderId: responseOrderDetail.data.orderId,
                userId: auth.user.userId,
                note: "string",
                price: total,
              };
              try {
                const responseUpdate = await api.put(urlUpdate, data);
                console.log(responseUpdate.data);
              } catch (error) {
                console.error(error);
              }
            }
          } catch (error) {
            console.error(error);
          }
        }
      });
    });
  };

  const paymentSubmit = async () => {
    //select method
    let method = "";
    const radioButtons = document.querySelectorAll(
      '.payment-section input[type="radio"]'
    );
    radioButtons.forEach((radioButton) => {
      if (radioButton.checked) {
        method = radioButton.value;
        console.log(method);
      }
    });
    if (method === "") {
      window.prompt("Please payment options");
    }
    if (method === "vnpay") {
      //create new payment
      const url = `/api/Payment/create-payment?OrderId=${cartItems[0]?.orderId}`;
      setLoading(true);
      try {
        const response = await api.post(url);
        if (response) {
          //call to get vnpay url
          console.log(response);
          const paymentUrl = `/api/VNPay?PaymentID=${response.data.paymentId}`;
          try {
            const response = await api.get(paymentUrl);
            console.log(response);
            setLoading(false);
            window.open(response.data);
          } catch (error) {
            console.error(error);
          }
        }
      } catch (error) {
        console.error(error);
      }
    } else if (method === "cash") {
      //create new payment
      const orderFinishurl = `/api/Order/paid?OrderID=${cartItems[0]?.orderId}`;
      setLoading(true);
      try {
        const response = await api.post(orderFinishurl);
        console.log(response.data);
        setLoading(false);
        //setting order true
      } catch (error) {
        console.error(error);
      }
    }
    if (loading) return;
  };

  // Fetch User Cart
  useEffect(() => {
    if (auth.user) {
      fetchData();
      fetchDataVoucherList();
      setName(auth.user.fullName);
      setEditName(auth.user.fullName);
      setAddress(auth.user.address);
      setEditAddress(auth.user.address);
      setPhoneNumber(auth.user.phoneNumber);
      setEditPhonenumber(auth.user.phoneNumber);
    } else navigate("/log-in");
  }, [updateQuantity]);
  //updateQuantity, paymentSubmit, auth

  if (cartItems?.length > 0) {
    //to fetch Data voucher
    let fetch = null;
    //handle select voucher and decrese total payment
    const fetchVoucherData = async (id) => {
      const url = `/api/Voucher/get-by-id?voucherId=${id}`;
      try {
        const response = await api.get(url);
        if (response) {
          console.log(response.data);
          fetch = response.data;
        }
      } catch (error) {
        console.log(error);
      }
    };

    //handle voucher
    const handleSelectVoucher = async (e) => {
      e.preventDefault();
      await fetchVoucherData(e.target.value);
      console.log(fetch);
      const selectedVoucher = fetch.discount;
      const total =
        cartItems[0]?.total -
        (parseFloat(selectedVoucher) / 100) * cartItems[0]?.total;
      console.log(total);
      setSelectVoucher(selectedVoucher);
      setTotalPrice(total);
    };

    if (statusReturn) {
      paymentSubmit();
      setStatusReturn(false);
    }

    return (
      <div className="cart-and-payment">
        <div className="cart-container">
          <h2 className="cart-and-payment-heading">Giỏ hàng</h2>
          <div className="cart-items">
            {cartItems?.map((orderDetail) =>
              orderDetail?.orderDetail?.map((product) => (
                <div key={product.productId} className="cart-item">
                  <button
                    onClick={() => removeItem(product.productId)}
                    className="remove-button"
                  >
                    <FaTrashAlt />
                  </button>
                  <div className="cart-item-info">
                    <div className="cart-item-image">
                      <img
                        src={product.product.image[0].imageUrl}
                        alt={product.product.productName}
                      />
                    </div>
                    <div className="cart-item-details">
                      <h3 className="cart-item-details-name">
                        {product.product.productName}
                      </h3>
                      <p>Giá tiền: ₫{formatCash(product.price)}</p>
                      <QuantityButton
                        initialQuantity={product.quantity}
                        onQuantityChange={(newQuantity) =>
                          updateQuantity(product.productId, newQuantity)
                        }
                      />
                      <p>
                        Thành tiền: ₫
                        {formatCash(product.price * product.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="payment-container">
          <h2 className="cart-and-payment-heading">Hóa đơn</h2>
          <div className="customer-info-section">
            {isEditingName ? (
              <div className="flex">
                <p>
                  Tên khách hàng:
                  <input
                    type="text"
                    onChange={(event) => setEditName(event.target.value)}
                    className="customer-info-section-input"
                    placeholder={name}
                    required
                  />
                </p>
              </div>
            ) : (
              <p>Tên khách hàng: {editName}</p>
            )}

            {isEditingPhoneNumber ? (
              <div className="flex">
                <p>
                  Số điện thoại:
                  <input
                    type="number"
                    onChange={(event) => setEditPhonenumber(event.target.value)}
                    className="customer-info-section-input"
                    minLength={10}
                    maxLength={11}
                    placeholder={phoneNumber}
                    required
                  />
                </p>
              </div>
            ) : (
              <p className="flex">Số điện thoại: {editPhonenumber} </p>
            )}

            {isEditingAddress ? (
              <div className="flex">
                <p>
                  Địa chỉ:
                  <input
                    type="text"
                    onChange={(event) => setEditAddress(event.target.value)}
                    className="customer-info-section-input"
                    placeholder={address}
                    required
                  />
                </p>
              </div>
            ) : (
              <p className="flex">Địa chỉ: {editAddress} </p>
            )}

            <div className="editting-information">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="customer-info-section-button"
                  >
                    Lưu
                  </button>
                  <button
                    className="customer-info-section-button red"
                    onClick={handleCustomerCancel}
                  >
                    Hủy
                  </button>
                </>
              ) : (
                <p>
                  <span
                    className="change-info change-customer-info"
                    onClick={handleCustomerEdit}
                  >
                    Thay đổi
                  </span>
                </p>
              )}
            </div>
          </div>

          <div className="voucher-section">
            <div className="voucher-section-combobox">
              <select
                name="voucher"
                id="voucher"
                className="voucher-combobox"
                onChange={handleSelectVoucher}
              >
                <option value="" disabled hidden selected>
                  Chọn Voucher
                </option>
                {voucherList?.map((voucher) => (
                  <option key={voucher.voucherId} value={voucher.voucherId}>
                    {voucher.voucherName}
                  </option>
                ))}
              </select>
            </div>
            <div className="voucher-info">
              <h3 className="voucher-info-title">
                {selectVoucher?.voucherName}
              </h3>
              <p className="voucher-info-description">
                {selectVoucher?.description}
              </p>
            </div>
          </div>

          <div className="payment-section">
            <div className="payment-method">
              <input
                type="radio"
                name="payment"
                value="vnpay"
                id="vnpay-button"
                className="payment-section-button"
              />
              <img
                src="https://firebasestorage.googleapis.com/v0/b/bscswp.appspot.com/o/localImage%2Fvnpay.png?alt=media&token=48a2114e-1389-4ab4-a31c-c4e72004ff8b"
                alt="vnpay"
                className="payment-logo"
              />
              <p>VnPay</p>
            </div>

            <div className="payment-method">
              <input
                type="radio"
                name="payment"
                value="cash"
                id="cash-button"
                className="payment-section-button"
              />
              <img
                src="https://firebasestorage.googleapis.com/v0/b/bscswp.appspot.com/o/localImage%2Fcash.png?alt=media&token=767cd8fe-8859-4d82-9893-b669e65bc062"
                alt="cash"
                className="payment-logo"
              />
              <p>Tiền Mặt</p>
            </div>
          </div>

          <div className="order-summary-section">
            <p className="order-summary-title">
              Tổng tiền hàng:{" "}
              <span className="order-summary-price">
                ₫{formatCash(cartItems[0]?.total) || 0}
              </span>
            </p>
            <p className="order-summary-title">
              Tổng tiền phí vận chuyển:{" "}
              <span className="order-summary-price">₫0</span>
            </p>
            {selectVoucher ? (
              <p className="order-summary-title">
                Tổng cộng Voucher giảm giá:{" "}
                <span className="order-summary-price">
                  ₫
                  {formatCash(
                    (parseFloat(selectVoucher) / 100) * cartItems[0]?.total
                  )}{" "}
                </span>
              </p>
            ) : (
              <p className="order-summary-title">
                Tổng cộng Voucher giảm giá:{" "}
                <span className="order-summary-price">₫0</span>
              </p>
            )}
          </div>

          <div className="total-section">
            <h3>Tổng thanh toán</h3>
            {selectVoucher === "" ? (
              <p>₫{formatCash(cartItems[0]?.total) || 0}</p>
            ) : (
              <p>₫{formatCash(totalPrice)}</p>
            )}
          </div>

          <div className="confirm-order">
            <button
              type="submit"
              // onClick={paymentSubmit}
              onClick={handleShowPopup}
              className="confirm-button"
            >
              Thanh toán
            </button>
          </div>
        </div>
        {showPopup && (
          <PopupModal
            action={"payment"}
            statusReturn={statusReturn}
            setStatusReturn={setStatusReturn}
            open={true}
            onClose={handleClose}
          />
        )}
      </div>
    );
  } else {
    return (
      <div className="cart-and-payment">
        <div className="cart-container">
          <h2 className="cart-and-payment-heading">Giỏ hàng</h2>
          <div className="cart-items">
            <div className="empty-cart">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/bscswp.appspot.com/o/localImage%2Fempty-cart.png?alt=media&token=477cd9aa-45ba-44a1-ba8c-6623fc2c8e87"
                alt="empty-cart"
                className="empty-cart-img"
              />
              <h3 className="empty-cart-text">
                Bạn chưa thêm sản phẩm vào giỏ hàng
              </h3>
            </div>
          </div>
        </div>

        <div className="payment-container">
          <h2 className="cart-and-payment-heading">Hóa đơn</h2>
          <div className="customer-info-section">
            {isEditingName ? (
              <div className="flex">
                <p>
                  Tên khách hàng:
                  <input
                    type="text"
                    onChange={(event) => setEditName(event.target.value)}
                    className="customer-info-section-input"
                    placeholder={name}
                    required
                  />
                </p>
              </div>
            ) : (
              <p>Tên khách hàng: {editName}</p>
            )}

            {isEditingPhoneNumber ? (
              <div className="flex">
                <p>
                  Số điện thoại:
                  <input
                    type="number"
                    onChange={(event) => setEditPhonenumber(event.target.value)}
                    className="customer-info-section-input"
                    minLength={10}
                    maxLength={11}
                    placeholder={phoneNumber}
                    required
                  />
                </p>
              </div>
            ) : (
              <p className="flex">Số điện thoại: {editPhonenumber} </p>
            )}

            {isEditingAddress ? (
              <div className="flex">
                <p>
                  Địa chỉ:
                  <input
                    type="text"
                    onChange={(event) => setEditAddress(event.target.value)}
                    className="customer-info-section-input"
                    placeholder={address}
                    required
                  />
                </p>
              </div>
            ) : (
              <p className="flex">Địa chỉ: {editAddress} </p>
            )}

            <div className="editting-information">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="customer-info-section-button"
                  >
                    Lưu
                  </button>
                  <button
                    className="customer-info-section-button red"
                    onClick={handleCustomerCancel}
                  >
                    Hủy
                  </button>
                </>
              ) : (
                <p>
                  <span
                    className="change-info change-customer-info"
                    onClick={handleCustomerEdit}
                  >
                    Thay đổi
                  </span>
                </p>
              )}
            </div>
          </div>

          <div className="voucher-section">
            <div className="voucher-section-combobox">
              <select name="voucher" id="voucher" className="voucher-combobox">
                <option value="" hidden>
                  Chọn Voucher
                </option>
              </select>
            </div>
            <div className="voucher-info">
              <h3 className="voucher-info-title">Không thể chọn voucher</h3>
              <p className="voucher-info-description">
                Bạn chưa có sản phẩm nên không được chọn voucher
              </p>
            </div>
          </div>

          <div className="payment-section">
            <div className="payment-method">
              <input
                type="radio"
                name="payment"
                value="vnpay"
                id="vnpay-button"
                className="payment-section-button"
              />
              <img
                src="https://firebasestorage.googleapis.com/v0/b/bscswp.appspot.com/o/localImage%2Fvnpay.png?alt=media&token=48a2114e-1389-4ab4-a31c-c4e72004ff8b"
                alt="vnpay"
                className="payment-logo"
              />
              <p>VnPay</p>
            </div>

            <div className="payment-method">
              <input
                type="radio"
                name="payment"
                value="cash"
                id="cash-button"
                className="payment-section-button"
              />
              <img
                src="https://firebasestorage.googleapis.com/v0/b/bscswp.appspot.com/o/localImage%2Fcash.png?alt=media&token=767cd8fe-8859-4d82-9893-b669e65bc062"
                alt="cash"
                className="payment-logo"
              />
              <p>Tiền Mặt</p>
            </div>
          </div>

          <div className="order-summary-section">
            <p className="order-summary-title">
              Tổng tiền hàng: <span className="order-summary-price">₫0</span>
            </p>
            <p className="order-summary-title">
              Tổng tiền phí vận chuyển:{" "}
              <span className="order-summary-price">₫0</span>
            </p>
            <p className="order-summary-title">
              Tổng cộng Voucher giảm giá:{" "}
              <span className="order-summary-price">₫0</span>
            </p>
          </div>

          <div className="total-section">
            <h3>Tổng thanh toán</h3>
            <p>₫0</p>
          </div>

          <div className="confirm-order">
            <button
              type="submit"
              // onClick={paymentSubmit}
              onClick={handleShowPopup}
              className="confirm-button"
            >
              Thanh toán
            </button>
          </div>
        </div>
        {showPopup && (
          <PopupModal
            action={"payment"}
            statusReturn={statusReturn}
            setStatusReturn={setStatusReturn}
            open={true}
            onClose={handleClose}
          />
        )}
      </div>
    );
  }
};

export default CartPage;
