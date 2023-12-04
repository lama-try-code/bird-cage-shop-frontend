import React, { Fragment, useEffect, useState } from "react";
import "./AddProductPage.css";
import ComboBox from "../../../components/combobox/ComboBox";
import { useParams } from "react-router-dom";
import api from "../../../components/utils/requestAPI";
import { storage } from "../../../components/utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import PopupModal from "../../../components/modal/PopupModal";

const AddProductPage = () => {
  const [avatarUrlCage, setAvatarUrlCage] = useState("");
  const [avatarUrlFood, setAvatarUrlFood] = useState("");
  const [avatarUrlAccess, setAvatarUrlAccess] = useState("");
  const [listStyle, setListStyle] = useState(null);

  const [name, setName] = useState("");
  const [selectSize, setSelectSize] = useState("");
  const [style, setStyle] = useState("");
  const [selectMaterial, setSelectMaterial] = useState("");
  const [selectColor, setSelectColor] = useState("");
  const [des, setDes] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const [imageCage, setImageCage] = useState("");
  const [imageFood, setImageFood] = useState("");
  const [imageAccess, setImageAccess] = useState("");

  //lấy param trên url
  const { action, productId } = useParams();

  //lấy state trong update
  const [productName, setProductName] = useState("");
  const [productStyle, setProductStyle] = useState("");
  const [productSize, setProductSize] = useState("");
  const [productMaterial, setProductMaterial] = useState("");
  const [productColor, setProductColor] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [result, setResult] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);

  const handleAvatarChangeCage = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    const data = await event.target.files[0].arrayBuffer();
    const metadata = {
      contentType: "image/png",
    };
    const storageRef = ref(storage, `/lama/${event.target.value}`);
    await uploadBytes(storageRef, data, metadata);

    const imageUrl = await getDownloadURL(storageRef);

    console.log(imageUrl);

    setImageCage(imageUrl);

    reader.onload = () => {
      setAvatarUrlCage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarChangeFood = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    const data = await event.target.files[0].arrayBuffer();
    const metadata = {
      contentType: "image/png",
    };
    const storageRef = ref(storage, `/lama/${event.target.value}`);
    await uploadBytes(storageRef, data, metadata);

    const imageUrl = await getDownloadURL(storageRef);

    console.log(imageUrl);

    setImageFood(imageUrl);

    reader.onload = () => {
      setAvatarUrlFood(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarChangeAccess = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    const data = await event.target.files[0].arrayBuffer();
    const metadata = {
      contentType: "image/png",
    };
    const storageRef = ref(storage, `/lama/${event.target.value}`);
    await uploadBytes(storageRef, data, metadata);

    const imageUrl = await getDownloadURL(storageRef);

    console.log(imageUrl);

    setImageAccess(imageUrl);

    reader.onload = () => {
      setAvatarUrlAccess(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  //fetch dựa vào style để tạo sản phẩm
  const fetchDataStyle = async () => {
    const urlStyle = "/api/Style/get-all";
    try {
      const responseStyle = await api.get(urlStyle);
      console.log(responseStyle.data);
      setListStyle(responseStyle.data);
    } catch (error) {
      console.error(error);
    }
  };

  //hết fetch data style

  //fetch data lồng để update
  const fetchCageDataForUpdate = async () => {
    const url = `/api/Product/get-by-id?id=${productId}`;
    try {
      const response = await api.get(url);
      console.log(response.data);
      setProductName(response.data.productName);
      setProductDescription(response.data.description);
      setProductPrice(response.data.price);
      setProductQuantity(response.data.quantity);
      setImageU(response.data.image[0].imageUrl);
      if (
        response.data.styleProduct != [] &&
        response.data.sizeProduct != [] &&
        response.data.materialProduct != [] &&
        response.data.colorProduct != []
      ) {
        setProductStyle(response.data.styleProduct[0].style.styleName);
        setProductSize(response.data.sizeProduct[0].size.size1);
        setProductMaterial(
          response.data.materialProduct[0].material.materialName
        );
        setProductColor(response.data.colorProduct[0].color.colorName);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    const priceDouble = parseFloat(price);
    const quantityNum = parseInt(quantity);
    if (quantityNum > 0 && priceDouble > 0) {
      const url = "/api/Product/create";
      const data = {
        productName: name,
        productDescription: des,
        quantity: quantityNum,
        price: priceDouble,
        discountPrice: 0,
        styles: [
          {
            styleID: style,
          },
        ],
        category: {
          categoryID: "Cate90fb2",
        },
        sizes: [
          {
            sizeID: selectSize,
          },
        ],
        colors: [
          {
            colorID: selectColor,
          },
        ],
        materials: [
          {
            materialID: selectMaterial,
          },
        ],
        imageUrl: imageCage,
      };
      try {
        const response = await api.post(url, data);
        console.log(response.data);
        if (response) {
          setShowPopup(true);
        }
      } catch (error) {
        console.error(error);
      }
    } else alert("bro");
  };

  useEffect(() => {
    fetchDataStyle();
    if (productId) fetchCageDataForUpdate();
  }, []);

  const handleToySubmit = async () => {
    const priceDouble = parseFloat(price);
    const quantityNum = parseInt(quantity);
    if (priceDouble > 0 && quantityNum > 0) {
      const url = "/api/Product/create";
      const data = {
        productName: name,
        productDescription: des,
        quantity: quantityNum,
        price: priceDouble,
        discountPrice: 0,
        category: {
          categoryID: "Catef5d6d",
        },
        imageUrl: imageAccess,
      };
      try {
        const response = await api.post(url, data);
        console.log(response.data);
        if (response) {
          setShowPopup(true);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("bro");
    }
  };

  const handleFoodSubmit = async () => {
    const priceDouble = parseFloat(price);
    const quantityNum = parseInt(quantity);
    if (priceDouble > 0 && quantityNum > 0) {
      const url = "/api/Product/create";
      const data = {
        productName: name,
        productDescription: des,
        quantity: quantityNum,
        price: priceDouble,
        discountPrice: 0,
        category: {
          categoryID: "Cate7646a",
        },
        imageUrl: imageFood,
      };
      try {
        const response = await api.post(url, data);
        console.log(response.data);
        if (response) {
          setShowPopup(true);
        }
      } catch (error) {
        console.error(error);
      }
    } else alert("bro");
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  if (action === "add-cage") {
    if (productId) {
      const handleCageUpdateSubmit = async () => {
        const priceDouble = parseFloat(price);
        const quantityNum = parseInt(quantity);
        if (quantityNum > 0 && priceDouble > 0) {
          const url = "/api/Product/update";
          if (style && selectMaterial && selectColor && selectSize) {
            console.log(style);
            setStyle(null);
            setSelectSize(null);
            setSelectMaterial(null);
            setSelectColor(null);
          }
          const data = {
            productID: productId,
            productName: name,
            quantity: quantityNum,
            productDescription: des,
            price: priceDouble,
            discountPrice: 0,
            status: true,
            styles: [
              {
                styleID: style,
              },
            ],
            sizes: [
              {
                sizeID: selectSize,
              },
            ],
            colors: [
              {
                colorID: selectColor,
              },
            ],
            materials: [
              {
                materialID: selectMaterial,
              },
            ],
            imageUrl: imageCage,
          };
          try {
            const response = await api.put(url, data);
            console.log(response.data);
            if (response) setShowSuccess(true);
          } catch (error) {
            console.error(error);
          }
        } else alert("bro");
      };

      const handleShowUpdatePopup = () => {
        setShowPopup(true);
      };

      const handleClose = () => {
        setShowPopup(false);
        setShowSuccess(false);
        console.log(result);
      };

      if (result) {
        handleCageUpdateSubmit();
        setResult(false);
      }

      return (
        // update lồng
        <div className="add-product-page">
          <div className="add-product-container">
            <h2 className="add-product-container-title">Thông tin</h2>
            <div className="add-product-section">
              <div className="add-product-of-img">
                <h2>Ảnh sản phẩm</h2>
                <img
                  src={imageCage}
                  alt="Product A"
                  className="product-cage-img"
                />
                <label htmlFor="imageInput" className="custom-file-upload">
                  Thêm ảnh sản phẩm
                </label>
                <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  onChange={handleAvatarChangeCage}
                  style={{ display: "none" }}
                />
              </div>
              <div className="add-product-of-profile">
                <h2>Hồ sơ</h2>
                <form onSubmit={handleShowUpdatePopup}>
                  <div className="add-product-input-container">
                    <label
                      htmlFor="name"
                      className="add-product-input-container-label"
                    >
                      Tên sản phẩm
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="add-product-input"
                      placeholder={productName}
                      onChange={(event) => setName(event.target.value)}
                      required
                    />
                  </div>
                  <div className="add-product-combobox">
                    <label
                      htmlFor="shape"
                      className="add-product-input-container-label"
                    >
                      Hình dáng
                    </label>
                    <ComboBox
                      classname={"style"}
                      onChange={setStyle}
                      defaultValue={productStyle}
                    />
                  </div>
                  <div className="add-product-combobox">
                    <label
                      htmlFor="size"
                      className="add-product-input-container-label"
                    >
                      Kích thước
                    </label>
                    <ComboBox
                      classname={"size"}
                      onChange={setSelectSize}
                      defaultValue={productSize}
                    />
                  </div>
                  <div className="add-product-combobox">
                    <label
                      htmlFor="material"
                      className="add-product-input-container-label"
                    >
                      Chất liệu
                    </label>
                    <ComboBox
                      classname={"material"}
                      onChange={setSelectMaterial}
                      defaultValue={productMaterial}
                    />
                  </div>
                  <div className="add-product-combobox">
                    <label
                      htmlFor="color"
                      className="add-product-input-container-label"
                    >
                      Màu sắc
                    </label>
                    <ComboBox
                      classname={"color"}
                      onChange={setSelectColor}
                      defaultValue={productColor}
                    />
                  </div>
                  <div className="add-product-input-container">
                    <label
                      htmlFor="description"
                      className="add-product-input-container-label"
                    >
                      Mô tả
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      className="add-product-input des-textarea"
                      required
                      placeholder={productDescription}
                      onChange={(event) => setDes(event.target.value)}
                    />
                  </div>
                  <div className="add-product-input-container">
                    <label
                      htmlFor="price"
                      className="add-product-input-container-label"
                    >
                      Giá tiền (&#8363;)
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      placeholder={productPrice}
                      className="add-product-input"
                      onChange={(event) => setPrice(event.target.value)}
                      required
                    />
                  </div>
                  <div className="add-product-input-container">
                    <label
                      htmlFor="inventory"
                      className="add-product-input-container-label"
                    >
                      Số lượng hàng trong kho
                    </label>
                    <input
                      type="number"
                      id="inventory"
                      name="inventory"
                      className="add-product-input"
                      placeholder={productQuantity}
                      onChange={(event) => setQuantity(event.target.value)}
                      required
                    />
                  </div>
                </form>
              </div>
            </div>
            <button
              type="submit"
              className="add-product-button"
            >
              Lưu sản phẩm
            </button>
          </div>
          {showPopup && (
            <PopupModal
              action={"update"}
              statusReturn={result}
              setStatusReturn={setResult}
              open={showPopup}
              onClose={handleClose}
            />
          )}
          {showSuccess && (
            <PopupModal
              action={"update success"}
              open={showSuccess}
              onClose={handleClose}
            />
          )}
        </div>
      );
    } else {
      return (
        // tạo lồng
        <div className="add-product-page">
          <div className="add-product-container">
            <h2 className="add-product-container-title">Thông tin</h2>
            <div className="add-product-section">
              <div className="add-product-of-img">
                <h2>Ảnh sản phẩm</h2>
                <img
                  src={avatarUrlCage}
                  alt="Product A"
                  className="product-cage-img"
                />
                <label htmlFor="imageInput" className="custom-file-upload">
                  Thêm ảnh sản phẩm
                </label>
                <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  onChange={handleAvatarChangeCage}
                  style={{ display: "none" }}
                />
              </div>
              <div className="add-product-of-profile">
                <h2>Hồ sơ</h2>
                <form onSubmit={handleSubmit}>
                  <div className="add-product-input-container">
                    <label
                      htmlFor="name"
                      className="add-product-input-container-label"
                    >
                      Tên sản phẩm
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="add-product-input"
                      placeholder="Nhập tên của sản phẩm"
                      onChange={(event) => setName(event.target.value)}
                      required
                    />
                  </div>
                  <div className="add-product-check-shape">
                    <label
                      htmlFor="shape"
                      className="add-product-input-container-label"
                    >
                      Hình dáng
                    </label>
                    <div className="add-product-style-input-container">
                      {listStyle?.map((style) => (
                        <div className="add-product-style-input">
                          <input
                            type="radio"
                            id="selectstyle"
                            name="shape"
                            value={style.styleId}
                            className="add-product-check-shape-button"
                            onClick={(event) => setStyle(event.target.value)}
                          />
                          <span className="button-title">
                            {style.styleName}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="add-product-combobox">
                    <label
                      htmlFor="size"
                      className="add-product-input-container-label"
                    >
                      Kích thước
                    </label>
                    <ComboBox classname={"size"} onChange={setSelectSize} />
                  </div>
                  <div className="add-product-combobox">
                    <label
                      htmlFor="material"
                      className="add-product-input-container-label"
                    >
                      Chất liệu
                    </label>
                    <ComboBox
                      classname={"material"}
                      onChange={setSelectMaterial}
                    />
                  </div>
                  <div className="add-product-combobox">
                    <label
                      htmlFor="color"
                      className="add-product-input-container-label"
                    >
                      Màu sắc
                    </label>
                    <ComboBox classname={"color"} onChange={setSelectColor} />
                  </div>
                  <div className="add-product-input-container">
                    <label
                      htmlFor="description"
                      className="add-product-input-container-label"
                    >
                      Mô tả
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      className="add-product-input des-textarea"
                      required
                      placeholder="Nhập mô tả của sản phẩm"
                      onChange={(event) => setDes(event.target.value)}
                    />
                  </div>
                  <div className="add-product-input-container">
                    <label
                      htmlFor="price"
                      className="add-product-input-container-label"
                    >
                      Giá tiền (&#8363;)
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      className="add-product-input"
                      placeholder="Nhập giá tiền của sản phẩm"
                      onChange={(event) => setPrice(event.target.value)}
                      required
                    />
                  </div>
                  <div className="add-product-input-container">
                    <label
                      htmlFor="inventory"
                      className="add-product-input-container-label"
                    >
                      Số lượng hàng trong kho
                    </label>
                    <input
                      type="number"
                      id="inventory"
                      name="inventory"
                      className="add-product-input"
                      placeholder="Nhập số lượng sản phẩm"
                      onChange={(event) => setQuantity(event.target.value)}
                      required
                    />
                  </div>
                </form>
              </div>
            </div>
            <button
              type="submit"
              className="add-product-button"
            >
              Lưu sản phẩm
            </button>
          </div>
          {showPopup && (
            <PopupModal
              action={"success"}
              open={showPopup}
              onClose={handleClose}
            />
          )}
        </div>
      );
    }
  }
  if (action === "add-food") {
    if (productId) {
      const handleFoodUpdateSubmit = async () => {
        const priceDouble = parseFloat(price);
        const quantityNum = parseInt(quantity);
        if (priceDouble > 0 && quantityNum > 0) {
          const url = "/api/Product/update";
          if (name === "" && des === "") {
            console.log(style);
            setName(null);
            setDes(null);
          }
          const data = {
            productID: productId,
            productName: name,
            quantity: quantityNum,
            productDescription: des,
            price: priceDouble,
            discountPrice: 0,
            status: true,
            imageUrl: imageFood,
          };
          try {
            const response = await api.put(url, data);
            console.log(response.data);
            if (response) setShowSuccess(true);
          } catch (error) {
            console.error(error);
          }
        } else alert("bro");
      };

      const handleShowUpdatePopup = () => {
        setShowPopup(true);
      };

      const handleClose = () => {
        setShowPopup(false);
        setShowSuccess(false);
        console.log(result);
      };

      if (result) {
        handleFoodUpdateSubmit();
        setResult(false);
      }

      return (
        //update
        //food a&t
        <div className="add-product-page">
          <div className="add-product-container">
            <h2 className="add-product-container-title">Thông tin</h2>
            <div className="add-product-section">
              <div className="add-product-food-at-of-img">
                <h2>Ảnh sản phẩm</h2>
                <img
                  src={imageFood}
                  alt="Product A"
                  className="product-food-at-img"
                />
                <label htmlFor="imageInput" className="custom-file-upload">
                  Thêm ảnh sản phẩm
                </label>
                <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  onChange={handleAvatarChangeFood}
                  style={{ display: "none" }}
                />
              </div>
              <div className="add-product-food-at-of-profile">
                <h2>Hồ sơ</h2>
                <form onSubmit={handleShowUpdatePopup}>
                  <div className="add-product-input-container">
                    <label
                      htmlFor="name"
                      className="add-product-input-container-label"
                    >
                      Tên sản phẩm
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="add-product-input"
                      placeholder={productName}
                      required
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>
                  <div className="add-product-input-container">
                    <label
                      htmlFor="description"
                      className="add-product-input-container-label"
                    >
                      Mô tả
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      className="add-product-input des-textarea"
                      placeholder={productDescription}
                      required
                      onChange={(event) => setDes(event.target.value)}
                    />
                  </div>
                  <div className="add-product-input-container">
                    <label
                      htmlFor="price"
                      className="add-product-input-container-label"
                    >
                      Giá tiền (&#8363;)
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      className="add-product-input"
                      placeholder={productPrice}
                      required
                      onChange={(event) => setPrice(event.target.value)}
                    />
                  </div>
                  <div className="add-product-input-container">
                    <label
                      htmlFor="inventory"
                      className="add-product-input-container-label"
                    >
                      Số lượng hàng trong kho
                    </label>
                    <input
                      type="number"
                      id="inventory"
                      name="inventory"
                      className="add-product-input"
                      placeholder={productQuantity}
                      required
                      onChange={(event) => setQuantity(event.target.value)}
                    />
                  </div>
                </form>
              </div>
            </div>
            <button
              type="submit"
              className="add-product-button"
            >
              Lưu sản phẩm
            </button>
          </div>
          {showPopup && (
            <PopupModal
              action={"update"}
              statusReturn={result}
              setStatusReturn={setResult}
              open={showPopup}
              onClose={handleClose}
            />
          )}
          {showSuccess && (
            <PopupModal
              action={"update success"}
              open={showSuccess}
              onClose={handleClose}
            />
          )}
        </div>
      );
    } else {
      return (
        //food a&t
        <div className="add-product-page">
          <div className="add-product-container">
            <h2 className="add-product-container-title">Thông tin</h2>
            <div className="add-product-section">
              <div className="add-product-food-at-of-img">
                <h2>Ảnh sản phẩm</h2>
                <img
                  src={avatarUrlFood}
                  alt="Product A"
                  className="product-food-at-img"
                />
                <label htmlFor="imageInput" className="custom-file-upload">
                  Thêm ảnh sản phẩm
                </label>
                <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  onChange={handleAvatarChangeFood}
                  style={{ display: "none" }}
                />
              </div>
              <div className="add-product-food-at-of-profile">
                <h2>Hồ sơ</h2>
                <form onSubmit={handleFoodSubmit}>
                  <div className="add-product-input-container">
                    <label
                      htmlFor="name"
                      className="add-product-input-container-label"
                    >
                      Tên sản phẩm
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="add-product-input"
                      required
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>
                  <div className="add-product-input-container">
                    <label
                      htmlFor="description"
                      className="add-product-input-container-label"
                    >
                      Mô tả
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      className="add-product-input des-textarea"
                      required
                      onChange={(event) => setDes(event.target.value)}
                    />
                  </div>
                  <div className="add-product-input-container">
                    <label
                      htmlFor="price"
                      className="add-product-input-container-label"
                    >
                      Giá tiền (&#8363;)
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      className="add-product-input"
                      required
                      onChange={(event) => setPrice(event.target.value)}
                    />
                  </div>
                  <div className="add-product-input-container">
                    <label
                      htmlFor="inventory"
                      className="add-product-input-container-label"
                    >
                      Số lượng hàng trong kho
                    </label>
                    <input
                      type="number"
                      id="inventory"
                      name="inventory"
                      className="add-product-input"
                      required
                      onChange={(event) => setQuantity(event.target.value)}
                    />
                  </div>
                </form>
              </div>
            </div>
            <button
              type="submit"
              className="add-product-button"
            >
              Lưu sản phẩm
            </button>
          </div>
          {showPopup && (
            <PopupModal
              action={"success"}
              open={showPopup}
              onClose={handleClose}
            />
          )}
        </div>
      );
    }
  }
  if (action === "add-toy") {
    if (productId) {
      const handleToyUpdateSubmit = async () => {
        const priceDouble = parseFloat(price);
        const quantityNum = parseInt(quantity);
        if (quantityNum > 0 && priceDouble > 0) {
          const url = "/api/Product/update";
          if (name === "" && des === "") {
            console.log(style);
            setName(null);
            setDes(null);
          }
          const data = {
            productID: productId,
            productName: name,
            quantity: quantityNum,
            productDescription: des,
            price: priceDouble,
            discountPrice: 0,
            status: true,
            imageUrl: imageAccess,
          };
          try {
            const response = await api.put(url, data);
            console.log(response.data);
            if (response) setShowSuccess(true);
          } catch (error) {
            console.error(error);
          }
        } else alert("bro");
      };

      const handleShowUpdatePopup = () => {
        setShowPopup(true);
      };

      const handleClose = () => {
        setShowPopup(false);
        setShowSuccess(false);
        console.log(result);
      };

      if (result) {
        handleToyUpdateSubmit();
        setResult(false);
      }

      return (
        <div className="add-product-page">
          <div className="add-product-container">
            <h2 className="add-product-container-title">Thông tin</h2>
            <div className="add-product-section">
              <div className="add-product-food-at-of-img">
                <h2>Ảnh sản phẩm</h2>
                <img
                  src={imageAccess}
                  alt="Product A"
                  className="product-food-at-img"
                />
                <label htmlFor="imageInput" className="custom-file-upload">
                  Thêm ảnh sản phẩm
                </label>
                <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  onChange={handleAvatarChangeAccess}
                  style={{ display: "none" }}
                />
              </div>
              <div className="add-product-food-at-of-profile">
                <h2>Hồ sơ</h2>
                <form onSubmit={handleShowUpdatePopup}>
                  <div className="add-product-input-container">
                    <label
                      htmlFor="name"
                      className="add-product-input-container-label"
                    >
                      Tên sản phẩm
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="add-product-input"
                      placeholder={productName}
                      required
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>
                  <div className="add-product-input-container">
                    <label
                      htmlFor="description"
                      className="add-product-input-container-label"
                    >
                      Mô tả
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      className="add-product-input des-textarea"
                      required
                      placeholder={productDescription}
                      onChange={(event) => setDes(event.target.value)}
                    />
                  </div>
                  <div className="add-product-input-container">
                    <label
                      htmlFor="price"
                      className="add-product-input-container-label"
                    >
                      Giá tiền (&#8363;)
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      className="add-product-input"
                      placeholder={productPrice}
                      required
                      onChange={(event) => setPrice(event.target.value)}
                    />
                  </div>
                  <div className="add-product-input-container">
                    <label
                      htmlFor="inventory"
                      className="add-product-input-container-label"
                    >
                      Số lượng hàng trong kho
                    </label>
                    <input
                      type="number"
                      id="inventory"
                      name="inventory"
                      className="add-product-input"
                      placeholder={productQuantity}
                      required
                      onChange={(event) => setQuantity(event.target.value)}
                    />
                  </div>
                </form>
              </div>
            </div>
            <button
              type="submit"
              className="add-product-button"
            >
              Lưu sản phẩm
            </button>
          </div>
          {showPopup && (
            <PopupModal
              action={"update"}
              statusReturn={result}
              setStatusReturn={setResult}
              open={showPopup}
              onClose={handleClose}
            />
          )}
          {showSuccess && (
            <PopupModal
              action={"update success"}
              open={showSuccess}
              onClose={handleClose}
            />
          )}
        </div>
      );
    } else {
      return (
        <div className="add-product-page">
          <div className="add-product-container">
            <h2 className="add-product-container-title">Thông tin</h2>
            <div className="add-product-section">
              <div className="add-product-food-at-of-img">
                <h2>Ảnh sản phẩm</h2>
                <img
                  src={avatarUrlAccess}
                  alt="Product A"
                  className="product-food-at-img"
                />
                <label htmlFor="imageInput" className="custom-file-upload">
                  Thêm ảnh sản phẩm
                </label>
                <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  onChange={handleAvatarChangeAccess}
                  style={{ display: "none" }}
                />
              </div>
              <div className="add-product-food-at-of-profile">
                <h2>Hồ sơ</h2>
                <form onSubmit={handleToySubmit}>
                  <div className="add-product-input-container">
                    <label
                      htmlFor="name"
                      className="add-product-input-container-label"
                    >
                      Tên sản phẩm
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="add-product-input"
                      required
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>
                  <div className="add-product-input-container">
                    <label
                      htmlFor="description"
                      className="add-product-input-container-label"
                    >
                      Mô tả
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      className="add-product-input des-textarea"
                      required
                      onChange={(event) => setDes(event.target.value)}
                    />
                  </div>
                  <div className="add-product-input-container">
                    <label
                      htmlFor="price"
                      className="add-product-input-container-label"
                    >
                      Giá tiền (&#8363;)
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      className="add-product-input"
                      required
                      onChange={(event) => setPrice(event.target.value)}
                    />
                  </div>
                  <div className="add-product-input-container">
                    <label
                      htmlFor="inventory"
                      className="add-product-input-container-label"
                    >
                      Số lượng hàng trong kho
                    </label>
                    <input
                      type="number"
                      id="inventory"
                      name="inventory"
                      className="add-product-input"
                      required
                      onChange={(event) => setQuantity(event.target.value)}
                    />
                  </div>
                </form>
              </div>
            </div>
            <button
              type="submit"
              className="add-product-button"
            >
              Lưu sản phẩm
            </button>
          </div>
          {showPopup && (
            <PopupModal
              action={"success"}
              open={showPopup}
              onClose={handleClose}
            />
          )}
        </div>
      );
    }
  }
};
export default AddProductPage;
