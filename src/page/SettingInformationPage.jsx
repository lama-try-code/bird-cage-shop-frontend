import React, { Fragment, useEffect, useState } from "react";
import "./SettingInformationPage.css";
import { Link, useParams } from "react-router-dom";
import api from "../components/utils/requestAPI";
import useAuth from "../hooks/useAuth";
import PopupModal from "../components/modal/PopupModal";

const SettingInformationPage = () => {
  const [avatarUrl, setAvatarUrl] = useState("");

  const [popup, setPopup] = useState(false);

  const { action, userId } = useParams();

  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [job, setJob] = useState("");
  const [birth, setBirth] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [img, setImg] = useState("");

  const [validate, setValidate] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMes] = useState(false);

  const handleClose = () => {
    setShowPopup(false);
    setMes(false);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setAvatarUrl(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = async (event) => {
    setSelectedDate(event.target.value);
  };

  const validateDateOfBirth = (event) => {
    const selectedDate = new Date(event.target.value);
    const today = new Date();

    if (selectedDate >= today) {
      setMes(true);
      setValidate(false);
      event.target.value = "";
    }
    setValidate(true);
  };

  const handleUpdate = async () => {
    if (validate) {
      const url = "/api/User/update";
      const data = {
        userID: userId,
        fullName: name,
        dateOfBird: selectedDate,
        roleID: job,
      };
      try {
        const response = await api.put(url, data);
        if (response) setShowPopup(true);
      } catch (error) {
        console.error(error);
      }
    } else {
    }
  };

  if (action === "admin") {
    const fetchData = async () => {
      const url = "/api/User/get-user-information";
      const data = {
        userID: userId,
      };
      try {
        const response = await api.post(url, data);
        setUser(user);
        //set fullname to display
        setName(response.data.fullName);
        //set roleId to display
        setJob(response.data.roleId);
        //set dob to display
        const date = new Date(response.data.dateOfBird);
        const formatted = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
        setBirth(formatted);
        //set roleId to see
      } catch (error) {
        console.error(error);
      }
    };
    useEffect(() => {
      fetchData();
    }, [user]);

    if (user !== "") {
      return (
        <Fragment>
          <div className="update-info-page">
            <div className="update-info-container">
              <h2 className="update-info-container-title">
                Chỉnh sửa thông tin của: {user?.userId}
              </h2>
              <div className="update-info-section">
                <div className="update-info-of-img">
                  <h2>Ảnh đại diện</h2>
                  <img src={user?.imageUrl} alt="Avatar" className="avatar" />
                  <label htmlFor="avatarInput" className="custom-file-upload">
                    Thay đổi ảnh đại diện
                  </label>
                  <input
                    type="file"
                    id="avatarInput"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    style={{ display: "none" }}
                  />
                </div>
                <div className="update-info-of-profile">
                  <h2>Hồ sơ</h2>
                  <form onSubmit={handleUpdate}>
                    <div className="update-info-input-container">
                      <label
                        htmlFor="name"
                        className="update-info-input-container-label"
                      >
                        Họ và Tên
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="update-info-input"
                        onChange={(event) => setName(event.target.value)}
                        placeholder={name}
                        required
                      />
                    </div>
                    <div className="update-info-check-container">
                      <div className="create-user-input-container">
                        <label className="create-user-label"> Chức vụ </label>
                        <input
                          type="radio"
                          name="job"
                          className="create-user-radio-button"
                          checked={job === "2"}
                          onClick={(event) => setJob("2")}
                        />{" "}
                        <span className="create-user-button-title">
                          Manager
                        </span>
                        <input
                          type="radio"
                          name="job"
                          className="create-user-radio-button"
                          checked={job === "3"}
                          onClick={(event) => setJob("3")}
                        />{" "}
                        <span className="create-user-button-title">Staff</span>
                      </div>
                      <div className="update-info-check-dob">
                        <label
                          htmlFor="dob"
                          className="update-info-input-container-label"
                        >
                          Ngày sinh
                        </label>
                        <input
                          type="date"
                          name="dob"
                          className="update-info-date"
                          placeholder={birth}
                          onChange={handleDateChange}
                          onBlur={validateDateOfBirth}
                          required
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <button
                type="submit"
                className="update-info-button"
              >
                Lưu thay đổi
              </button>
            </div>
            {showPopup && (
              <PopupModal
                action={"update success"}
                open={showPopup}
                onClose={handleClose}
              />
            )}
          </div>
          {message && (
            <PopupModal
              action={"filled"}
              open={showPopup}
              onClose={handleClose}
            />
          )}
        </Fragment>
      );
    }
  } else {
    const fetchData = async () => {
      const url = "/api/User/get-user-information";
      const data = {
        userID: userId,
      };
      try {
        const response = await api.post(url, data);
        setUser(user);
        //set fullname to display
        setName(response.data.fullName);
        //set roleId to display
        setJob(response.data.roleId);
        //set dob to display
        const date = new Date(response.data.dateOfBird);
        const formatted = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
        setBirth(formatted);
        //set Gender
        if (response.data.gender) {
          setGender("M");
        } else {
          setGender("F");
        }
        //set Address
        setAddress(response.data.address);
        //set Phonenumber
        setPhoneNum(response.data.phoneNumber);
        //set img url
        setImg(response.data.imageUrl);
      } catch (error) {
        console.error(error);
      }
    };
    useEffect(() => {
      fetchData();
    }, [user]);

    return (
      <Fragment>
        <div className="setting-homepage-link-bar">
          <Link to={"/home"} className="setting-homepage-link">
            {" "}
            Về trang chủ
          </Link>
        </div>
        <div className="update-info-page">
          <div className="update-info-container">
            <h2 className="update-info-container-title">Chỉnh sửa thông tin</h2>
            <div className="update-info-section">
              <div className="update-info-of-img">
                <h2>Ảnh đại diện</h2>
                <img src={img} alt="Avatar" className="avatar" />
                <label htmlFor="avatarInput" className="custom-file-upload">
                  Thay đổi ảnh đại diện
                </label>
                <input
                  type="file"
                  id="avatarInput"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ display: "none" }}
                />
              </div>
              <div className="update-info-of-profile">
                <h2>Hồ sơ</h2>
                <form>
                  <div className="update-info-input-container">
                    <label
                      htmlFor="name"
                      className="update-info-input-container-label"
                    >
                      Họ và Tên
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="update-info-input"
                      placeholder={name}
                      required
                    />
                  </div>
                  <div className="update-info-check-container">
                    <div className="update-info-check-sex">
                      <label
                        htmlFor="sex"
                        className="update-info-input-container-label"
                      >
                        Giới tính
                      </label>
                      <input
                        type="radio"
                        name="sex"
                        value="M"
                        className="update-info-check-sex-button"
                      />{" "}
                      <span className="button-title">Nam</span>
                      <input
                        type="radio"
                        name="sex"
                        value="F"
                        className="update-info-check-sex-button"
                      />{" "}
                      <span className="button-title">Nữ</span>
                    </div>
                    <div className="update-info-check-dob">
                      <label
                        htmlFor="dob"
                        className="update-info-input-container-label"
                      >
                        Ngày sinh
                      </label>
                      <input
                        type="date"
                        name="dob"
                        className="update-info-date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        onBlur={validateDateOfBirth}
                        required
                      />
                    </div>
                  </div>
                  <div className="update-info-input-container">
                    <label
                      htmlFor="address"
                      className="update-info-input-container-label"
                    >
                      Địa chỉ
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className="update-info-input"
                      placeholder={address}
                      required
                    />
                  </div>
                  <div className="update-info-input-container">
                    <label
                      htmlFor="phone-number"
                      className="update-info-input-container-label"
                    >
                      Số điện thoại
                    </label>
                    <input
                      type="number"
                      id="phone-number"
                      name="phone-number"
                      className="update-info-input"
                      placeholder={phoneNum}
                      required
                    />
                  </div>
                </form>
              </div>
            </div>
            <button type="submit" className="update-info-button">
              Lưu thay đổi
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
};

export default SettingInformationPage;
