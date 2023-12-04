import React, { useState } from "react";
import api from "../../../components/utils/requestAPI";
import "./CreateVoucherPage.css";
import PopupModal from "../../../components/modal/PopupModal";

function CreateVoucherPage() {
  const [voucher, setVoucher] = useState({
    name: "",
    description: "",
    value: "",
    begin: "",
    expiry: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVoucher({ ...voucher, [name]: value });
  };

  const handleAddVoucher = async () => {
    if (
      voucher.name &&
      parseInt(voucher.value) > 0 &&
      voucher.expiry &&
      voucher.begin &&
      voucher.description
    ) {
      const url = "/api/Voucher/create-voucher";
      const data = {
        voucherName: voucher.name,
        description: voucher.description,
        discount: voucher.value,
        startDate: voucher.begin,
        endDate: voucher.expiry,
      };
      try {
        const response = await api.post(url, data);
        if (response) setShowPopup(true);
        setVoucher({
          name: "",
          description: "",
          value: "",
          begin: "",
          expiry: "",
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Vui lòng điền đầy đủ thông tin tên, giá trị và ngày hết hạn.");
    }
  };

  return (
    <div className="create-voucher-page">
      <h1 className="create-voucher-title">Tạo Voucher</h1>
      <form onSubmit={handleAddVoucher}>
        <div className="create-voucher-input-container">
          <label className="create-voucher-input-label" htmlFor="name">
            Tên voucher
          </label>
          <input
            className="create-voucher-input-field"
            type="text"
            id="name"
            name="name"
            placeholder="Nhập tên voucher"
            value={voucher.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="create-voucher-input-container">
          <label className="create-voucher-input-label" htmlFor="description">
            Mô tả
          </label>
          <input
            className="create-voucher-input-field"
            type="text"
            id="description"
            name="description"
            placeholder="Nhập mô tả voucher"
            value={voucher.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="create-voucher-input-container">
          <label className="create-voucher-input-label" htmlFor="discount">
            Giá Trị Giảm (%)
          </label>
          <input
            className="create-voucher-input-field"
            type="number"
            id="value"
            name="value"
            placeholder="Nhập giá trị giảm"
            value={voucher.value}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="create-voucher-input-container">
          <label className="create-voucher-input-label" htmlFor="expiry">
            Ngày bắt đầu
          </label>
          <input
            className="create-voucher-input-field"
            type="date"
            id="begin"
            name="begin"
            pattern="\d{1,2}/\d{1,2}/\d{4}"
            placeholder="dd/mm/yyyy"
            value={voucher.begin}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="create-voucher-input-container">
          <label className="create-voucher-input-label" htmlFor="expiry">
            Ngày hết hạn
          </label>
          <input
            className="create-voucher-input-field"
            type="date"
            id="expiry"
            name="expiry"
            pattern="\d{1,2}/\d{1,2}/\d{4}"
            placeholder="dd/mm/yyyy"
            value={voucher.expiry}
            onChange={handleInputChange}
            required
          />
        </div>
        <button className="add-button" type="button">
          Thêm voucher
        </button>
      </form>
      {showPopup && (
        <PopupModal action={"success"} open={showPopup} onClose={handleClose} />
      )}
    </div>
  );
}

export default CreateVoucherPage;
