import React, { useState } from "react";
import "../RolePage.css";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const ManagerPage = () => {
  const { auth } = useAuth();
  return (
    <div className="role-page">
      <h1 className="role-page-welcome">Xin chào {auth?.user?.fullName}</h1>
      <h2 className="role-page-manage-tasks-title">
        Mời bạn chọn các tác vụ dưới đây để quản lí
      </h2>
      <div className="role-page-manage-tasks">
        <Link to={`/product/view-product`} className="role-page-manage-task">
          <h3 className="role-page-manage-task-title">Quản lí sản phẩm</h3>
          <img src="https://firebasestorage.googleapis.com/v0/b/bscswp.appspot.com/o/localImage%2Fproduct.png?alt=media&token=f50838c9-f0b5-4fb4-90c8-5ac83abff96d" className="role-page-manage-task-img" />
        </Link>
        <Link to={`/voucher/view-voucher`} className="role-page-manage-task">
          <h3 className="role-page-manage-task-title">Quản lí voucher</h3>
          <img src="https://firebasestorage.googleapis.com/v0/b/bscswp.appspot.com/o/localImage%2Fvoucher.png?alt=media&token=fe0a2410-1d95-4bf7-9e81-c3edbb360d1a" className="role-page-manage-task-img" />
        </Link>
        <Link to={`/dashboard`} className="role-page-manage-task">
          <h3 className="role-page-manage-task-title">Thống kê</h3>
          <img src="https://firebasestorage.googleapis.com/v0/b/bscswp.appspot.com/o/localImage%2Fdashboard.png?alt=media&token=2adf8e91-5709-43c7-bf22-40ea4e513f52" className="role-page-manage-task-img" />
        </Link>
      </div>
    </div>
  );
};

export default ManagerPage;
