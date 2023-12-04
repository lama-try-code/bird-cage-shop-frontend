import React, { useEffect, useState } from "react";
import "./FeedbackPage.css";
import { Link, useParams } from "react-router-dom";
import api from "../../../components/utils/requestAPI";

const FeedbackPage = () => {
  const { action } = useParams();
  const [listProduct, setListProduct] = useState(null);
  const [listCage, setListCage] = useState(null);
  const [listFood, setListFood] = useState(null);
  const [listToy, setListToy] = useState(null);

  const fetchData = async () => {
    const url = "/api/Product/get-all";
    try {
      const response = await api.get(url);
      console.log(response.data);
      setListProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const sortByCage = () => {
      const list = [];
      listProduct?.map((cage) => {
        cage?.categoryProduct.map((cate) => {
          console.log(cate.category);
          if (cate?.category.categoryName === "Cage") list.push(cage);
        });
      });
      setListCage(list);
    };

    const sortByFood = () => {
      const list = [];
      listProduct?.map((food) => {
        food.categoryProduct.map((cate) => {
          if (cate?.category.categoryName === "Food") list.push(food);
        });
      });
      setListFood(list);
    };

    const sortByToy = () => {
      const list = [];
      listProduct?.map((toy) => {
        toy.categoryProduct.map((cate) => {
          if (cate?.category.categoryName === "Toy") list.push(toy);
        });
      });
      console.log(list);
      setListToy(list);
    };

    if (listProduct) {
      sortByCage();
      sortByFood();
      sortByToy();
    }
  }, [listProduct]);

  function formatCash(currency) {
    return currency?.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  if (action === "view-product") {
    return (
      <div className="product-manager-page">
        {listCage?.length > 0 ? (
          <div>
            <h2 className="product-manager-page-title">Lồng chim</h2>
            {listCage.map((cage) => (
              <Link
                to={`/item-info/${action}/${cage.productId}`}
                className="product-manager-page-section link"
                key={cage.productId}
              >
                <h3 className="product-name">{cage.productName}</h3>
                <div className="product-info">
                  <div className="product-img">
                    <img src={cage?.image[0]?.imageUrl} alt="cage" />
                  </div>
                  <div className="product-description">
                    <p className="product-description-title">Mô tả sản phẩm</p>
                    <p>{cage.description}</p>
                  </div>
                  <div className="quantity-and-price">
                    <p>Đang có {cage.quantity} sản phẩm</p>
                    <p>Giá tiền ₫{formatCash(cage.price)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div>
            <h2 className="product-manager-page-title">Lồng chim</h2>
            <h4>Không có sản phẩm</h4>
          </div>
        )}
        {listFood?.length > 0 ? (
          <div>
            <h2 className="product-manager-page-title">Thức ăn cho chim</h2>
            {listFood?.map((food) => (
              <Link
                to={`/item-info/${action}/${food.productId}`}
                className="product-manager-page-section link"
                key={food.productId}
              >
                <h3 className="product-name">{food.productName}</h3>
                <div className="product-info">
                  <div className="product-img">
                    <img src={food?.image[0]?.imageUrl} alt="avatar" />
                  </div>
                  <div className="product-description">
                    <p className="product-description-title">Mô tả sản phẩm</p>
                    <p>{food.description}</p>
                  </div>
                  <div className="quantity-and-price">
                    <p>Đang có {food.quantity} sản phẩm</p>
                    <p>Giá tiền ₫{formatCash(food.price)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div>
            <h2 className="product-manager-page-title">Thức ăn cho chim</h2>
            <h4>Không có sản phẩm</h4>
          </div>
        )}
        {listToy?.length > 0 ? (
          <div>
            <h2 className="product-manager-page-title">Phụ kiện - Đồ chơi</h2>
            {listToy?.map((toy) => (
              <Link
                to={`/item-info/${action}/${toy.productId}`}
                className="product-manager-page-section link"
                key={toy.productId}
              >
                <h3 className="product-name">{toy.productName}</h3>
                <div className="product-info">
                  <div className="product-img">
                    <img src={toy?.image[0]?.imageUrl} alt="avatar" />
                  </div>
                  <div className="product-description">
                    <p className="product-description-title">Mô tả sản phẩm</p>
                    <p>{toy.description}</p>
                  </div>
                  <div className="quantity-and-price">
                    <p>Đang có {toy.quantity} sản phẩm</p>
                    <p>Giá tiền ₫{formatCash(toy.price)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div>
            <h2 className="product-manager-page-title">Phụ kiện - Đồ chơi</h2>
            <h4>Không có sản phẩm</h4>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="product-manager-page">
        {listCage?.length > 0 ? (
          <div>
            <h2 className="product-manager-page-title">Lồng chim</h2>
            {listCage?.map((cage) => {
              return (
                <Link
                  to={`/item-info/${action}/${cage.productId}`}
                  className="product-manager-page-section link"
                  key={cage.productId}
                >
                  <div className="product-manager-page-section-header">
                    <h3 className="product-name">{cage.productName}</h3>
                  </div>
                  <div className="product-info">
                    <div className="product-img">
                      <img src={cage?.image[0]?.imageUrl} alt="avatar" />
                    </div>
                    <div className="product-description">
                      <p className="product-description-title">
                        Mô tả sản phẩm
                      </p>
                      <p>{cage.description}</p>
                    </div>
                    <div className="quantity-and-price">
                      <p>Đang có {cage.quantity} sản phẩm</p>
                      <p>Giá tiền ₫{formatCash(cage.price)}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div>
            <h2 className="product-manager-page-title">Lồng chim</h2>
            <h4>Không có sản phẩm</h4>
          </div>
        )}

        {listFood?.length > 0 ? (
          <div>
            <h2 className="product-manager-page-title">Thức ăn cho chim</h2>
            {listFood?.map((food) => {
              return (
                <Link
                  to={`/item-info/${action}/${food.productId}`}
                  className="product-manager-page-section link"
                  key={food.productId}
                >
                  <div className="product-manager-page-section-header">
                    <h3 className="product-name">{food.productName}</h3>
                  </div>
                  <div className="product-info">
                    <div className="product-img">
                      <img src={food?.image[0]?.imageUrl} alt="avatar" />
                    </div>
                    <div className="product-description">
                      <p className="product-description-title">
                        Mô tả sản phẩm
                      </p>
                      <p>{food.description}</p>
                    </div>
                    <div className="quantity-and-price">
                      <p>Đang có {food.quantity} sản phẩm</p>
                      <p>Giá tiền ₫{formatCash(food.price)}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div>
            <h2 className="product-manager-page-title">Thức ăn cho chim</h2>
            <h4>Không có sản phẩm</h4>
          </div>
        )}

        {listToy?.length > 0 ? (
          <div>
            <h2 className="product-manager-page-title">Phụ kiện - Đồ chơi</h2>
            {listToy?.map((toy) => (
              <Link
                to={`/item-info/${action}/${toy.productId}`}
                className="product-manager-page-section link"
                key={toy.productId}
              >
                <div className="product-manager-page-section-header">
                  <h3 className="product-name">{toy?.productName}</h3>
                </div>
                <div className="product-info">
                  <div className="product-img">
                    <img src={toy?.image[0].imageUrl} alt="avatar" />
                  </div>
                  <div className="product-description">
                    <p className="product-description-title">Mô tả sản phẩm</p>
                    <p>{toy.description}</p>
                  </div>
                  <div className="quantity-and-price">
                    <p>Đang có {toy.quantity} sản phẩm</p>
                    <p>Giá tiền ₫{formatCash(toy.price)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div>
            <h2 className="product-manager-page-title">Phụ kiện - Đồ chơi</h2>
            <h4>Không có sản phẩm</h4>
          </div>
        )}
      </div>
    );
  }
};

export default FeedbackPage;
