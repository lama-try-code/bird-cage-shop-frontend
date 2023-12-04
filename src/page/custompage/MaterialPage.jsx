import React, { useEffect, useState } from "react";
import "./CustomPage.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import api from "../../components/utils/requestAPI";

const MaterialPage = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const { productId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [chose, setChose] = useState("");
  const [listMaterial, setListMaterial] = useState(null);
  const [product, setProduct] = useState(null);

  const [styleData, setStyleData] = useState(null);
  const [sizeData, setSizeData] = useState(null);

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

  const fetchData = async (size) => {
    const url = `/api/Material/get-for-custom?sizeId=${size}`;
    // const url = `/api/Material/get-for-custom?sizeId=Sif4a814d`;
    try {
      const response = await api.get(url);
      setListMaterial(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserCage = async () => {
    const url = "/api/ProductCustom/get-product-custom-for-user";
    const data = {
      userId: auth?.user?.userId,
      productId: productId,
    };
    console.log(data);
    try {
      const response = await api.post(url, data);
      setProduct(response.data);
      console.log(response.data);
      if (response.data) {
        fetchData(response.data.productSize);
        fetchSizeData(response.data.productSize);
        fetchStyleData(response.data.productStyle);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useState(() => {
    fetchUserCage();
  }, [product]);

  const handleButtonClick = async (event, name) => {
    event.preventDefault();
    setChose(event.target.value);
    console.log(event.target.value);
    const url = "/api/ProductCustom/update-material-custom-product";
    const data = {
      userId: auth?.user?.userId,
      productId: product?.productCustomId,
      materialId: event.target.value,
    };
    setIsLoading(true);

    try {
      const response = await api.put(url, data);

      if (response) {
        navigate(`/custom-products-color/${productId}`);
        console.log(response.data);
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
          <li>
            <Link to="/custom-products-shape"> Hình Dáng </Link>
          </li>
          <li>
            <Link to="/custom-products-size"> Kích Thước </Link>
          </li>
          <li className="bc-grey">
            <Link to="/custom-products-material"> Chất Liệu </Link>
          </li>
          <li>
            <Link to="/custom-products-color">Màu Sắc </Link>
          </li>
        </ul>
      </div>

      <div className="custom-option-detail">
        <h2 className="custom-option-detail-title">
          Chọn Chất Liệu Lồng Của Bạn{" "}
        </h2>
        <div className="custom-choose-and-detail">
          <div className="custom-option-detail-list">
            {listMaterial?.map((material) => (
              <div className="custom-detail-item">
                <h3>{material?.materialName}</h3>
                <p>₫{formatCash(material?.price)}</p>
                <button
                  onClick={handleButtonClick}
                  value={material?.materialId}
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
                Vật liệu: <span>Chưa chọn</span>
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

export default MaterialPage;
