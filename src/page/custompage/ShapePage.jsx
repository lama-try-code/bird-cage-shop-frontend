import React, { useEffect, useState } from "react";
import "./CustomPage.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import api from "../../components/utils/requestAPI";
import { event } from "jquery";

const ShapePage = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const { productId } = useParams();

  const [ProductCustom, setProductCustom] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [listStyle, setListStyle] = useState(null);

  const fetchData = async () => {
    const url = "/api/Style/get-for-custom";
    try {
      const response = await api.get(url);
      console.log(response.data);
      setListStyle(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserCage = async () => {
    const url = "/api/ProductCustom/get-product-custom-for-user?UserId";
    const data = {
      userId: auth?.user?.userId,
      productId: productId,
    };
    try {
      const response = await api.post(url, data);
      console.log(response.data);
      setProductCustom(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchUserCage();
  }, [auth]);

  const handleButtonClick = async (event, id) => {
    event.preventDefault();
    const url = "/api/ProductCustom/update-style-custom-product";
    const data = {
      productId: ProductCustom?.productCustomId,
      userId: auth?.user?.userId,
      styleId: id,
    };

    setIsLoading(true);

    try {
      console.log(data);
      const response = await api.put(url, data);

      if (response) {
        setSelectedStyle(id);
        navigate(`/custom-products-size/${productId}`);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
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
          <li className="bc-grey">
            <Link to="/custom-products-shape"> Hình Dáng </Link>
          </li>
          <li>
            <Link to="/custom-products-size"> Kích Thước </Link>
          </li>
          <li>
            <Link to="/custom-products-material"> Chất Liệu </Link>
          </li>
          <li>
            <Link to="/custom-products-color">Màu Sắc </Link>
          </li>
        </ul>
      </div>

      <div className="custom-option-detail">
        <h2 className="custom-option-detail-title">
          Chọn Hình Dáng Lồng Của Bạn{" "}
        </h2>
        <div className="custom-choose-and-detail">
          <div className="custom-option-detail-list">
            {listStyle?.map((style) => (
              <div className="custom-detail-item">
                <h3> {style.styleName} </h3>
                {style?.image?.map((img) => (
                  <img
                    src={img.imageUrl}
                    alt="Chim"
                    className="custom-product-image"
                  />
                ))}
                <p>₫{formatCash(style?.price)}</p>
                <button
                  onClick={(event) => handleButtonClick(event, style.styleId)}
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
              <p>Tên lồng: {ProductCustom?.productName}</p>
              <p>Hình dáng: Chưa chọn</p>
              <p>Kích thước: Chưa chọn</p>
              <p>Vật liệu: Chưa chọn</p>
              <p>Màu sắc: Chưa chọn</p>

              <h4>Giá Hiện Tại: ₫{ProductCustom?.price || 0}</h4>
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

export default ShapePage;
