import React, { useEffect, useState } from "react";
import "./CustomPage.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import api from "../../components/utils/requestAPI";

const TotalPage = () => {
  const { auth } = useAuth();
  const [cartItems, setCartItems] = useState(null);

  //product information
  const [product, setProduct] = useState(null);
  const [style, setStyle] = useState(null);
  const [size, setSize] = useState(null);
  const [material, setMaterial] = useState(null);
  const [Color, setColor] = useState(null);

  const { productId, orderId } = useParams();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [editName, setEditName] = useState("");
  const [editPhonenumber, setEditPhonenumber] = useState("");
  const [editAddress, setEditAddress] = useState("");

  const [isEditing, setEditing] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const [isNameChange, setIsNameChange] = useState(false);
  const [isPhoneNumChange, setIsPhoneNumChange] = useState(false);
  const [isAddressChange, setIsAddressChange] = useState(false);
  const [voucherList, setVoucherList] = useState(null);

  const [selectVoucher, setSelectVoucher] = useState("");

  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

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
    if (isNameChange || isPhoneNumChange || isAddressChange) {
      setName(editName);
      setPhoneNumber(editPhonenumber);
      setAddress(editAddress);

      console.log("y");

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
      try {
        const response = await api.put(url, data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (auth.user) {
      fetchUserCage();
      fetchOrder();
      fetchDataVoucherList();
      setName(auth.user.fullName);
      setEditName(auth.user.fullName);
      setAddress(auth.user.address);
      setEditAddress(auth.user.address);
      setPhoneNumber(auth.user.phoneNumber);
      setEditPhonenumber(auth.user.phoneNumber);
    } else navigate("/log-in");
  }, []);

  //fetch user cage
  const fetchUserCage = async () => {
    const url = "/api/ProductCustom/get-product-custom-for-user";
    const data = {
      userId: auth?.user?.userId,
      productId: productId,
    };
    try {
      const response = await api.post(url, data);
      setProduct(response.data);
      await fetchStyleName(response.data.productStyle);
      await fetchSizeName(response.data.productSize);
      await fetchMaterialName(response.data.productMaterial);
      await fetchColorName(response.data.productColor);
    } catch (error) {
      console.log(error);
    }
  };

  //fetch style name
  const fetchStyleName = async (id) => {
    const url = `/api/Style/get-by-id?styleId=${id}`;
    try {
      const response = await api.get(url);
      setStyle(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSizeName = async (id) => {
    const url = `/api/Size/get-by-id?id=${id}`;
    try {
      const response = await api.get(url);
      setSize(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMaterialName = async (id) => {
    const url = `/api/Material/get-by-id?id=${id}`;
    try {
      const response = await api.get(url);
      setMaterial(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchColorName = async (id) => {
    const url = `/api/Color/get-by-id?id=${id}`;
    try {
      const response = await api.get(url);
      setColor(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDataVoucherList = async () => {
    const url = "/api/Voucher/get-for-user";
    try {
      const response = await api.get(url);
      setVoucherList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  //fetch user order
  const fetchOrder = async () => {
    const url = `/api/Order/get-custom-order`;
    const data = {
      userID: auth.user.userId,
    };
    try {
      const response = await api.post(url, data);
      setCartItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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

  const handleResetButtonClick = async (event) => {
    event.preventDefault();
    const url = `/api/ProductCustom/remove?id=${productId}`;
    try {
      const response = await api.delete(url);
      navigate(`/custom-cage`);
    } catch (error) {
      console.error(error);
    }
    const orderUrl = `/api/Order/remove-order?OrderId=${orderId}`;
    try {
      const responseOrder = await api.delete(orderUrl);
      navigate("/user-page");
    } catch (error) {
      console.error(error);
    }
  };

  // const handleConfirmButtonClick = async (event) => {
  // event.preventDefault();
  // const url = "";
  // const data = {
  // userId: auth?.user?.userId,
  // styleName: name,
  // };
  //
  // setIsLoading(true);
  //
  // try {
  // const response = await api.post(url, data);
  //
  // if (response) {
  // navigate("/cart");
  // }
  //
  // setIsLoading(false);
  // } catch (error) {
  // console.log(error);
  // }
  //
  // if (isLoading) {
  // return;
  // }
  // };

  function formatCash(currency) {
    return currency?.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const handleConfirmButtonClick = async () => {
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
      setIsLoading(true);
      //create new payment
      const url = `/api/Payment/create-payment?OrderId=${cartItems[0]?.orderId}`;
      try {
        const response = await api.post(url);
        if (response) {
          //call to get vnpay url
          console.log(response);
          const paymentUrl = `/api/VNPay?PaymentID=${response.data.paymentId}`;
          try {
            const response = await api.get(paymentUrl);
            console.log(response);
            window.open(response.data);
            setIsLoading(false);
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
      setIsLoading(true);
      try {
        const response = await api.post(orderFinishurl);
        setIsLoading(false);
        //setting order true
      } catch (error) {
        console.error(error);
      }
    }
    if (isLoading) return;
  };

  if (cartItems === null || cartItems.length === 0) {
    return (
      <>
        <p>Loading</p>
      </>
    );
  } else {
    return (
      <div className="custom-page">
        <div>
          <h1 className="custom-title border-bottom">Thiết Kế Lồng</h1>
        </div>

        <div className="custom-summary-total">
          <h2 className="cart-and-payment-heading">Hóa đơn</h2>
          <div className="flex-center">
            <div className="custom-summary-total-section">
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
                        onChange={(event) =>
                          setEditPhonenumber(event.target.value)
                        }
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
              <div className="custom-summary-total-detail">
                <h2>Thông tin lồng</h2>
                <p>
                  Tên lồng:{" "}
                  <span className="custom-summary-total-detail-info">
                    {product?.productName}
                  </span>
                </p>
                <p>
                  Kiểu lồng:{" "}
                  <span className="custom-summary-total-detail-info">
                    {style?.styleName}
                  </span>
                </p>
                <p>
                  Kích thước:{" "}
                  <span className="custom-summary-total-detail-info">
                    {size?.size1} - {size?.sizeDescription}
                  </span>
                </p>
                <p>
                  Vật liệu:{" "}
                  <span className="custom-summary-total-detail-info">
                    {material?.materialName}
                  </span>
                </p>
                <p>
                  Màu sắc:{" "}
                  <span className="custom-summary-total-detail-info">
                    {Color?.colorName}
                  </span>
                </p>
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
                  <img src="https://firebasestorage.googleapis.com/v0/b/bscswp.appspot.com/o/localImage%2Fvnpay.png?alt=media&token=48a2114e-1389-4ab4-a31c-c4e72004ff8b" alt="vnpay" className="payment-logo" />
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
                  <img src="https://firebasestorage.googleapis.com/v0/b/bscswp.appspot.com/o/localImage%2Fcash.png?alt=media&token=767cd8fe-8859-4d82-9893-b669e65bc062" alt="cash" className="payment-logo" />
                  <p>Tiền Mặt</p>
                </div>
              </div>

              <div className="order-summary-section">
                <p className="order-summary-title">
                  Tổng tiền hàng:{" "}
                  <span className="order-summary-price">
                    ₫{formatCash(cartItems[0].total)}
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
                      {
                        formatCash()
                        // (parseFloat(selectVoucher) / 100) * cartItems[0]?.total
                      }{" "}
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
                  <p>₫{formatCash(cartItems[0].total || 0)}</p>
                ) : (
                  <p>₫{formatCash(totalPrice)}</p>
                )}
              </div>
              <div className="custom-summary-total-detail-button">
                <button
                  type="submit"
                  className="custom-summary-total-reset"
                  onClick={(event) => handleResetButtonClick(event)}
                >
                  Thiết Lập Lại Đơn Hàng
                </button>
                <button
                  type="submit"
                  onClick={handleConfirmButtonClick}
                  className="custom-summary-total-confirm"
                >
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default TotalPage;
