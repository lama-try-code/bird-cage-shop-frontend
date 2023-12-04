import React, { useEffect, useState } from "react";
import Img1 from "/demo.jpg";
import "./ProductPage.css";
import ComboBox from "../../components/combobox/ComboBox";
import api from "../../components/utils/requestAPI";
import { Link } from "react-router-dom";

const AccessoriesToysPage = () => {
  const [toy, setToy] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `/api/Product/get-by-category?categoryId=Catef5d6d`;
        const response = await api.get(url);
        console.log(response.data);
        setToy(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  function formatCash(currency) {
    return currency?.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <div className="product-page">
      <ComboBox classname="product" />
      <div className="product-items-section">
        {toy?.map((product) => (
          <Link to={`/item-info/${product.productId}`} className="product-item">
            <div className="product-image">
              {product.image.map((image) => (
                <img src={image.imageUrl} alt="Food" key={image.imageId} />
              ))}
            </div>
            <div className="product-details">
              <h4 className="product-title">{product.productName}</h4>
              <p className="product-price">₫{formatCash(product.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AccessoriesToysPage;
