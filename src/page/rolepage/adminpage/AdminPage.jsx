import React, { useState } from "react";
import "../RolePage.css";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const AdminPage = () => {
    const { auth } = useAuth();

    return (
        <div className="role-page">
            <h1 className="role-page-welcome">Xin chào {auth?.user?.fullName}</h1>
            <h2 className="role-page-manage-tasks-title">Mời bạn chọn các tác vụ dưới đây để quản lí</h2>
            <div className="role-page-manage-tasks">
                <Link to="/manage-account/view" className="role-page-manage-task">
                    <h3 className="role-page-manage-task-title">Quản lí tài khoản</h3>
                    <img src="https://firebasestorage.googleapis.com/v0/b/bscswp.appspot.com/o/localImage%2Faccount.png?alt=media&token=8b0d9b42-377f-4a3f-bc04-9d59458b0106" className="role-page-manage-task-img" />
                </Link>
            </div>
        </div>
    );
};

export default AdminPage;
