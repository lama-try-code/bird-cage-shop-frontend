import React, { useEffect, useState } from "react";
import "./ManageAccount.css";
import "../RolePage.css";
import api from "../../../components/utils/requestAPI";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import PopupModal from "../../../components/modal/PopupModal";

// Sample user account data (replace with your data)
const ManageAccount = () => {
  const { auth } = useAuth();
  const { action } = useParams();

  const [result, setResult] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [listUser, setListUser] = useState(null);
  const [id, setId] = useState("");

  const navigate = useNavigate();

  const fetchData = async () => {
    const url = "/api/User/get-all";
    try {
      const response = await api.get(url);
      console.log(response.data);
      const list = Object.values(response.data);
      const sortList = list.sort((a, b) => a.roleId - b.roleId);
      setListUser(sortList);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const url = `/api/User/remove`;
    const data = {
      userID: id,
    };
    try {
      const response = await api.delete(url, {
        headers: {
          "Content-Type": "application/json-patch+json",
        },
        data: JSON.stringify(data),
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id) => {
    navigate(`/info-setting/admin/${id}`);
  };

  useEffect(() => {
    fetchData();
  }, [auth, handleDelete]);

  const handlePopup = (id) => {
    setShowPopup(true);
    setId(id);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  if (result) {
    handleDelete(id);
    setResult(false);
  }

  function formatDate(date) {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  if (action === "view") {
    return (
      <div className="manage">
        <h1 className="page-title">Tài khoản</h1>
        <table className="user-table">
          <thead>
            <tr>
              <th>Ảnh đại diện</th>
              <th>Tên đăng nhập</th>
              <th>Chức vụ</th>
              <th>Họ và tên</th>
              <th>Giới tính</th>
              <th>Ngày sinh</th>
              <th>Địa chỉ</th>
              <th>Số điện thoại</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody className="content-info">
            {listUser?.map((user, index) => (
              <tr key={index}>
                <td>
                  <img src={user.imageURL} alt={`${user.userName}`} />
                </td>
                <td className="overflow overflow-scroll short">
                  {user.userName}
                </td>
                <td className="overflow overflow-scroll short">chức vụ</td>
                <td className="overflow overflow-scroll short">
                  {user.fullName}
                </td>
                {user.gender ? (
                  // Nội dung khi user.gender là true
                  <td>Nam</td>
                ) : (
                  // Nội dung khi user.gender là false
                  <td>Nữ</td>
                )}

                <td>{formatDate(user.dateOfBird)}</td>
                <td className="overflow overflow-scroll">{user.address}</td>
                <td>{user.phoneNumber}</td>
                <td className="overflow overflow-scroll">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div className="edit-account">
        <h1 className="page-title">Tài khoản</h1>
        <table className="user-table">
          <thead>
            <tr>
              <th>Ảnh đại diện</th>
              <th>Tên đăng nhập</th>
              <th>Chức vụ</th>
              <th>Họ và tên</th>
              <th>Giới tính</th>
              <th>Ngày sinh</th>
              <th>Địa chỉ</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th>Tác vụ</th>
            </tr>
          </thead>
          <tbody className="content-info">
            {listUser?.map((user, index) => (
              <tr key={index}>
                <td>
                  <img src={user.imageURL} alt={`${user.userName}`} />
                </td>
                <td className="overflow-edit overflow-scroll short">
                  {user.userName}
                </td>
                <td className="overflow overflow-scroll short">chức vụ</td>
                <td className="overflow-edit overflow-scroll short">
                  {user.fullName}
                </td>
                {user.gender ? (
                  // Nội dung khi user.gender là true
                  <td>Nam</td>
                ) : (
                  // Nội dung khi user.gender là false
                  <td>Nữ</td>
                )}

                <td>{formatDate(user.dateOfBird)}</td>
                <td className="overflow-edit overflow-scroll long">
                  {user.address}
                </td>
                <td>{user.phoneNumber}</td>
                <td className="overflow-edit overflow-scroll long">
                  {user.email}
                </td>
                <td>
                  <button
                    className="update-button"
                    onClick={() => handleUpdate(user.userId)}
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    className="remove-button"
                    onClick={() => handlePopup(user.userId)}
                  >
                    <FaTrashAlt />
                  </button>
                  {showPopup && (
                    <PopupModal
                      action={"remove"}
                      statusReturn={result}
                      setStatusReturn={setResult}
                      open={showPopup}
                      onClose={handleClose}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default ManageAccount;
