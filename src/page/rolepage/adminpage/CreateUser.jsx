import React, { useState } from "react";
import "./CreateUser.css";
import api from "../../../components/utils/requestAPI";
import PopupModal from "../../../components/modal/PopupModal";

const CreateUser = () => {
  const [fullname, setFullname] = useState(null);
  const [gender, setGender] = useState(false);
  const [job, setJob] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [action, setAction] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      fullname &&
      gender &&
      job &&
      dob &&
      address &&
      phoneNumber &&
      username &&
      password
    ) {
      const currentDate = new Date();
      const selectedDate = new Date(dob);
      if (selectedDate >= currentDate) {
        window.prompt("Ngày sinh không hợp lệ");
        return;
      }
      const url = "/api/User/create-user";
      const data = {
        username: username,
        password: password,
        roleId: job,
        fullname: fullname,
        gender: gender,
        dateOfBirth: dob,
        address: address,
        phonenumber: phoneNumber,
      };

      setIsLoading(true);
      try {
        const response = await api.post(url, data);
        console.log(response.data);
        if (response) {
          setShowPopup(true);
          setAction("success");
        } else {
          setShowPopup(true);
          setAction("failed");
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }

      if (isLoading) {
        return;
      }
    } else {
      setShowPopup(true);
      setAction("filled");
    }
  };

  const handleClose = () => {
    setAction("");
    setShowPopup(false);
  };

  return (
    <div className="create-user-container">
      <h1 className="create-user-title">Tạo tài khoản nhân viên & quản lý</h1>
      <form onSubmit={handleSubmit}>
        <div className="create-user-input-container">
          <label className="create-user-label">Họ và Tên</label>
          <input
            type="text"
            name="fullName"
            placeholder="Nhập họ và tên"
            onChange={(event) => setFullname(event.target.value)}
            className="create-user-input"
          />
        </div>
        <div className="create-user-input-container">
          <label className="create-user-label">Giới tính</label>
          <input
            type="radio"
            name="gender"
            className="create-user-radio-button"
            onClick={(event) => setGender(true)}
          />{" "}
          <span className="create-user-button-title">Nam</span>
          <input
            type="radio"
            name="gender"
            onClick={(event) => setGender(false)}
            className="create-user-radio-button"
          />{" "}
          <span className="create-user-button-title">Nữ</span>
        </div>

        <div className="create-user-input-container">
          <label className="create-user-label"> Chức vụ </label>
          <input
            type="radio"
            name="job"
            className="create-user-radio-button"
            onClick={(event) => setJob("2")}
          />{" "}
          <span className="create-user-button-title">Quản lí</span>
          <input
            type="radio"
            name="job"
            className="create-user-radio-button"
            onClick={(event) => setJob("3")}
          />{" "}
          <span className="create-user-button-title">Nhân viên</span>
        </div>

        <div className="create-user-input-container">
          <label className="create-user-label">Ngày sinh</label>
          <input
            type="date"
            name="birthDate"
            className="create-user-input"
            onChange={(event) => setDob(event.target.value)}
            required
          />
        </div>
        <div className="create-user-input-container">
          <label className="create-user-label">Địa chỉ</label>
          <input
            type="text"
            name="address"
            className="create-user-input"
            placeholder="Nhập địa chỉ"
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>
        <div className="create-user-input-container">
          <label className="create-user-label">Số điện thoại</label>
          <input
            type="number"
            name="phoneNumber"
            className="create-user-input"
            placeholder="Nhập số điện thoại"
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </div>
        <div className="create-user-input-container">
          <label className="create-user-label">Tên đăng nhập</label>
          <input
            type="text"
            name="username"
            className="create-user-input"
            placeholder="Nhập tên đăng nhập"
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>
        <div className="create-user-input-container">
          <label className="create-user-label">Mật khẩu</label>
          <input
            type="password"
            name="password"
            className="create-user-input"
            placeholder="Nhập mật khẩu"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button
          type="submit"
          className="create-user-button"
        >
          Tạo mới
        </button>
      </form>
      {showPopup && (
        <PopupModal action={action} open={showPopup} onClose={handleClose} />
      )}
    </div>
  );
};

export default CreateUser;
