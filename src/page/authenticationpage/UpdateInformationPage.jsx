import React, { useEffect, useState } from "react";
import "./AuthenticationPage.css";
import api from "../../components/utils/requestAPI";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const UpdateInformationPage = () => {
  const { auth, setAuth } = useAuth();
  const [displayUser, setDisplayUser] = useState(null);
  const [fullname, setFullname] = useState();
  const [sex, setSex] = useState();
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState();
  const [phonenumber, setPhonenumber] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState("");

  const navigate = useNavigate();

  const validateDateOfBirth = (event) => {
    const selectedDate = new Date(event.target.value);
    const today = new Date();
    if (selectedDate >= today) {
      alert("Please select a valid date of birth.");
      event.target.value = ""; // Clear the input field
    }
  };

  const fetchData = async () => {
    const url = "/api/User/get-user-information";
    const data = {
      userID: auth?.user?.userId,
    };
    try {
      const response = await api.post(url, data);
      setDisplayUser(response.data);
      //set fullname to display
      setName(response.data.fullName);
      //set roleId to display
      setGender(response.data.gender);
      //set dob to display
      const date = new Date(response.data.dateOfBird);
      const formatted = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
      setBirth(formatted);
      //set address to display
      setAddress(response.data.address);
      //set phoneNumber
      setPhonenumber(response.data.phoneNumber);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = "/api/User/update";
    const data = {
      userID: auth?.user?.userId,
      fullName: fullname,
      address: address,
      phone: phonenumber,
      gender: sex,
      dateOfBird: birthday,
    };

    setIsLoading(true);
    console.log(auth.user.userId);
    console.log(sex);
    const response = await api.put(url, data);
    if (response.data != null) {
      const user = response.data;
      const auth = localStorage.getItem("Authen");
      setAuth({ user, auth });
      navigate("/user-page");
    } else alert("Kiểm tra lại");
    setIsLoading(false);

    if (isLoading) {
      return;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="authentication-section">
      <a href="/sign-up" className="homepage-link">
        {" "}
        Về trang đăng kí
      </a>
      <div className="authentication-container">
        <h2>Điền thông tin</h2>
        <form onSubmit={handleSubmit}>
          <div className="authentication-input-container">
            <label
              htmlFor="name"
              className="authentication-input-container-label"
            >
              Họ và Tên
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="authentication-input"
              required
              placeholder={name}
              onChange={(event) => setFullname(event.target.value)}
            />
          </div>
          <div className="authentication-check-container">
            <div className="authentication-check-sex">
              <label
                htmlFor="sex"
                className="authentication-input-container-label"
              >
                Giới tính
              </label>
              <input
                type="radio"
                name="sex"
                value={true}
                className="authentication-check-sex-button"
                onChange={(event) => setSex(event.target.value)}
              />
              <span className="button-title">Nam</span>
              <input
                type="radio"
                name="sex"
                value={false}
                className="authentication-check-sex-button"
                onChange={(event) => setSex(event.target.value)}
              />
              <span className="button-title">Nữ</span>
            </div>
            <div className="authentication-check-dob">
              <label
                htmlFor="dob"
                className="authentication-input-container-label"
              >
                Ngày sinh
              </label>
              <input
                type="date"
                name="dob"
                className="authentication-date"
                onChange={(event) => setBirthday(event.target.value)}
                onBlur={validateDateOfBirth}
                required
              />
            </div>
          </div>
          <div className="authentication-input-container">
            <label
              htmlFor="address"
              className="authentication-input-container-label"
            >
              Địa chỉ
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="authentication-input"
              placeholder={address}
              required
              onChange={(event) => setAddress(event.target.value)}
            />
          </div>
          <div className="authentication-input-container">
            <label
              htmlFor="phone-number"
              className="authentication-input-container-label"
            >
              Số điện thoại
            </label>
            <input
              type="number"
              id="phone-number"
              name="phone-number"
              className="authentication-input"
              placeholder={phonenumber}
              required
              onChange={(event) => setPhonenumber(event.target.value)}
            />
          </div>
          <button type="submit" className="authentication-button">
            Xác nhận
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateInformationPage;
