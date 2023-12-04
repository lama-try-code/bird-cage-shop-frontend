import React, { useState } from "react";
import "../RolePage.css";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const StaffPage = () => {
  const { auth } = useAuth();
  return (
    <div className="role-page">
      <h1 className="role-page-welcome">Xin chào {auth?.user?.fullName}</h1>
      <h2 className="role-page-manage-tasks-title">
        Mời bạn chọn các tác vụ dưới đây để quản lí
      </h2>
      <div className="role-page-manage-tasks">
        <Link to="/manage-blogs/view-blog" className="role-page-manage-task">
          <h3 className="role-page-manage-task-title">Quản lí bài viết</h3>
          <img src="https://firebasestorage.googleapis.com/v0/b/bscswp.appspot.com/o/localImage%2Fblog.png?alt=media&token=06dc77ac-56ad-48fa-972e-885ddc7a4af9" className="role-page-manage-task-img" />
        </Link>
         <Link to="/feedback/view-product" className="role-page-manage-task"> 
         <h3 className="role-page-manage-task-title">Quản lí feedback</h3> 
         <img src="https://firebasestorage.googleapis.com/v0/b/bscswp.appspot.com/o/localImage%2Ffeedback.png?alt=media&token=9dcac729-cb46-48ae-bc26-f40a08264d3a" className="role-page-manage-task-img" /> 
         </Link> 
         <Link to="/order/view-order" className="role-page-manage-task"> 
         <h3 className="role-page-manage-task-title">Quản lí đơn hàng</h3> 
         <img src="https://firebasestorage.googleapis.com/v0/b/bscswp.appspot.com/o/localImage%2Forder.png?alt=media&token=9ec08ca8-ab70-4254-948f-7a4f8f850c9d" className="role-page-manage-task-img" /> 
         </Link> 
      </div>
    </div>
  );
};

export default StaffPage;
