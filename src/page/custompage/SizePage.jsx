import React, { useEffect, useState } from "react";
import "./CustomPage.css";
import ComboBox from "../../components/combobox/ComboBox";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import api from "../../components/utils/requestAPI";

const SizePage = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const { productId } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const [ListSize, setListSize] = useState(null);
  const [product, setProduct] = useState(null);
  const [sizeNames, setSizeNames] = useState([]);
  const [sizeData, setSizeData] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [styleData, setStyleData] = useState(null);

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

  const fetchData = async (style) => {
    const url = `/api/Size/uniqueNames?styleId=${style}`;
    try {
      const response = await api.get(url);
      console.log(response.data);
      setSizeNames(response.data);
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
      setProduct(response.data);
      if (response.data) {
        fetchData(response.data.productStyle);
        fetchStyleData(response.data.productStyle);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserCage();
  }, []);

  const fetchDataDescription = async () => {
    const list = [];
    for (const sizeName of sizeNames) {
      const url = `/api/Size/get-by-name?SizeName=${sizeName}`;
      const response = await api.post(url);

      response.data.forEach((item) => {
        list.push(item);
      });
      console.log(list);
    }
    setSizeData(list);
  };

  useEffect(() => {
    fetchDataDescription();
  }, [sizeNames]);

  const handleSizeChange = (event) => {
    setSelectedSize("");
    setSelectedSize(event.target.value);
  };
  const renderSizeOptions = (size) => {
    const currentSizeData = sizeData.filter((item) => item.size1 === size);

    return (
      <select
        value={selectedSize}
        placeholder="Chọn kích thước"
        onChange={handleSizeChange}
      >
        <option value={null} hidden>
          Hãy chọn kích thước
        </option>
        {currentSizeData.map((size) => (
          <option key={size.sizeId} value={size.sizeId}>
            {size.sizeDescription} - ₫{formatCash(size.price)}
          </option>
        ))}
      </select>
    );
  };

  const handleButtonClick = async (event, name) => {
    event.preventDefault();
    const url = "/api/ProductCustom/update-size-custom-product";
    const data = {
      productId: product?.productCustomId,
      userId: auth?.user?.userId,
      sizeId: selectedSize,
    };
    setIsLoading(true);
    try {
      const response = await api.put(url, data);
      if (response) {
        navigate(`/custom-products-material/${productId}`);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);

      if (isLoading) {
        return;
      }
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
  if (productId !== null) {
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
            Chọn Kích Thuớc Lồng Của Bạn{" "}
          </h2>
          <div className="custom-choose-and-detail">
            <div className="custom-option-detail-list">
              {sizeNames?.map((size) => (
                <div className="custom-detail-item">
                  <h3> Thanh Đan: {size} </h3>
                  <img
                    src="../../../public/Panel/8.jpg"
                    alt="Chim"
                    className="custom-product-image"
                  />
                  <p>{size.sizeDescription}</p>
                  <div className="combo-box-product">
                    {renderSizeOptions(size)}
                  </div>
                  <button onClick={handleButtonClick} className="choose-button">
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
                  Kích thước: <span>Chưa chọn</span>
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
  } else {
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
            Xin hãy hoàn thành bước trước đó
          </h2>
        </div>
      </div>
    );
  }
};

export default SizePage;
