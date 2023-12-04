import React, { useEffect, useState } from "react";
import "./CustomPage.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import api from "../../components/utils/requestAPI";

const ColorPage = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const { productId } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const [product, setProduct] = useState(null);
  const [listColor, setListColor] = useState(null);

  const [styleData, setStyleData] = useState(null);
  const [sizeData, setSizeData] = useState(null);
  const [materialData, setMaterialData] = useState(null);

  const current = new Date();
  const date = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;

  const fetchStyleData = async (id) => {
    const url = `/api/Style/get-by-id?styleId=${id}`;
    try {
      const response = await api.get(url);
      console.log(response.data);
      setStyleData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchSizeData = async (id) => {
    const url = `/api/Size/get-by-id?id=${id}`;
    try {
      const response = await api.get(url);
      setSizeData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMaterialName = async (id) => {
    const url = `/api/Material/get-by-id?id=${id}`;
    try {
      const response = await api.get(url);
      setMaterialData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserCage = async () => {
    const url = "/api/ProductCustom/get-product-custom-for-user";
    const data = {
      userId: auth?.user?.userId,
      productId: productId,
    };
    try {
      const response = await api.post(url, data);
      console.log(response.data);
      setProduct(response.data);
      if (response.data != null) {
        fetchData();
        fetchStyleData(response.data.productStyle);
        fetchSizeData(response.data.productSize);
        fetchMaterialName(response.data.productMaterial);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    // const url = `/api/Color/get-for-custom?materialId=${material}`;
    const url = `/api/Color/get-for-custom`;
    try {
      const response = await api.get(url);
      console.log(response.data);
      setListColor(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserCage();
  }, []);

  const handleButtonClick = async (event, name) => {
    event.preventDefault();
    console.log(name);
    const url = "/api/ProductCustom/update-color-custom-product";
    const data = {
      userId: auth?.user?.userId,
      productId: productId,
      colorId: name,
    };

    setIsLoading(true);

    try {
      const response = await api.put(url, data);
      console.log(response.data);
      if (response.data) {
        createNewOrderCustom(response.data.price);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }

    if (isLoading) {
      return;
    }
  };

  //function to add new order => order custom

  const createCustomOrderDetail = async (orderId) => {
    const url = `/api/OrderDetail/create-new`;
    const data = {
      orderId: orderId,
      productId: productId,
      feedbackId: null,
      quantity: 1,
    };
    setIsLoading(true);

    try {
      const response = await api.post(url, data);
      if (response.data)
        navigate(`/custom-products-end/${orderId}/${product.productCustomId}`);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
    if (isLoading) {
      return;
    }
  };

  const createNewOrderCustom = async (total) => {
    const url = "/api/Order/create-new-custom-product";
    const data = {
      userID: auth.user.userId,
      productCustomId: productId,
      note: "string",
      createDate: date,
      total: total,
    };
    setIsLoading(true);
    try {
      const response = await api.post(url, data);
      console.log(response.data);
      createCustomOrderDetail(response.data.orderId);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
    if (isLoading) {
      return;
    }
  };

  function formatCash(currency) {
    return currency?.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const handleRemove = async (event) => {
    event.preventDefault();
    const url = `/api/ProductCustom/remove?id=${productId}`;
    try {
      const response = await api.delete(url);
      navigate(`/custom-cage`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="custom-page">
      <h2 className="custom-title">Thiết Kế Lồng</h2>
      <div className="custom-option">
        <ul>
          <li>
            <Link to="/custom-products-shape"> Hình Dáng </Link>
          </li>
          <li>
            <Link to="/custom-products-size"> Kích Thước </Link>
          </li>
          <li>
            <Link to="/custom-products-material"> Chất Liệu </Link>
          </li>
          <li className="bc-grey">
            <Link to="/custom-products-color">Màu Sắc </Link>
          </li>
        </ul>
      </div>

      <div className="custom-option-detail">
        <h2 className="custom-option-detail-title">
          Chọn Màu Sắc Lồng Của Bạn{" "}
        </h2>
        <div className="custom-choose-and-detail">
          <div className="custom-option-detail-list">
            {listColor?.map((color) => (
              <div className="custom-detail-item">
                <h3>{color.colorName}</h3>
                <img
                  src={color.imageUrl}
                  alt="Chim"
                  className="custom-product-image"
                />
                <button
                  onClick={(event) => handleButtonClick(event, color.colorId)}
                  className="choose-button"
                >
                  Chọn
                </button>
              </div>
            ))}
          </div>

          <div className="custom-summary">
            <div className="custom-summary-detail">
              <h2>Thông tin lồng</h2>
              <p>Tên lồng: {product?.productName}</p>
              <p>Hình dáng: {styleData?.styleName} </p>
              <p>
                Kích thước:{" "}
                <span>
                  {sizeData?.size1} - {sizeData?.sizeDescription}
                </span>
              </p>
              <p>
                Vật liệu: <span>{materialData?.materialName}</span>
              </p>
              <p>
                Màu sắc: <span>Chưa chọn</span>
              </p>
              <h4>Giá Hiện Tại: ₫{formatCash(product?.price) || 0}</h4>
            </div>

            <div className="custom-summary-reset">
              <button type="submit" onClick={(event) => handleRemove(event)}>
                Thiết Lập Lại Đơn Hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPage;
