import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaBookOpen,
  FaBreadSlice,
  FaBullhorn,
  FaDove,
  FaEdit,
  FaRegEdit,
  FaRegCommentAlt,
  FaRegListAlt,
  FaGift,
  FaRegMoneyBillAlt,
  FaUserAlt,
  FaBoxes,
  FaCreativeCommonsSa,
  FaUser,
  FaUserEdit,
  FaMoneyBillWave,
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaChartBar,
} from "react-icons/fa";
import "./SideNav.css";
import useAuth from "../../hooks/useAuth";

const SideNav = () => {
  const { auth } = useAuth();
  const { action } = useParams();
  // for admin
  if (auth?.user?.roleId === "1") {
    return (
      <div className="side-navbar">
        <Link to="/manage-account/view" className="side-navbar-link">
          <FaUserAlt className="side-navbar-link-icon" /> Xem toàn bộ tài khoản
        </Link>
        <Link to="/create-user" className="side-navbar-link">
          <FaUser className="side-navbar-link-icon" /> Tạo tài khoản
        </Link>
        <Link to="/manage-account/update" className="side-navbar-link">
          <FaUserEdit className="side-navbar-link-icon" /> Chỉnh sửa tài khoản
        </Link>
      </div>
    );
  }
  // manager
  if (auth?.user?.roleId === "2") {
    if (
      action === "manage-voucher" ||
      action === "view-voucher" ||
      action === "edit-voucher" ||
      action === "create"
    ) {
      console.log(action);
      return (
        <div className="side-navbar">
          <Link to="/voucher/view-voucher" className="side-navbar-link">
            <FaRegMoneyBillAlt className="side-navbar-link-icon" /> Xem voucher
          </Link>
          <Link to="/create-voucher/create" className="side-navbar-link">
            <FaRegEdit className="side-navbar-link-icon" /> Tạo voucher
          </Link>
          <Link to="/voucher/edit-voucher" className="side-navbar-link">
            <FaEdit className="side-navbar-link-icon" /> Chỉnh sửa voucher
          </Link>
        </div>
      );
    }

    if (action === 'view-product' || action === 'add-cage' || action === 'add-food'
      || action === 'add-toy' || action === 'edit-product') {
      return (
        <div className="side-navbar">
          <Link to="/product/view-product" className="side-navbar-link">
            <FaBoxes className="side-navbar-link-icon" /> Xem toàn bộ sản phẩm
          </Link>
          <Link to="/add-product/add-cage" className="side-navbar-link">
            <FaDove className="side-navbar-link-icon" /> Thêm lồng chim
          </Link>
          <Link to="/add-product/add-food" className="side-navbar-link">
            <FaBreadSlice className="side-navbar-link-icon" /> Thêm thức ăn cho
            chim
          </Link>
          <Link to="/add-product/add-toy" className="side-navbar-link">
            <FaGift className="side-navbar-link-icon" /> Thêm phụ kiện - đồ chơi
          </Link>
          <Link to="/product/edit-product" className="side-navbar-link">
            <FaEdit className="side-navbar-link-icon" /> Chỉnh sửa toàn bộ sản
            phẩm
          </Link>
        </div>
      );
    } else {
      return (
        <div className="side-navbar">
          <Link to="/dashboard" className="side-navbar-link">
            <FaChartBar className="side-navbar-link-icon" /> Thống kê tổng
          </Link>
          <Link to="/dashboard/revenue" className="side-navbar-link">
            <FaMoneyBillWave className="side-navbar-link-icon" /> Thống kê doanh thu
          </Link>
          <Link to="/dashboard/inventory" className="side-navbar-link">
            <FaBox className="side-navbar-link-icon" /> Thống kê hàng hóa
          </Link>
          <Link to="/dashboard/order" className="side-navbar-link">
            <FaShoppingCart className="side-navbar-link-icon" /> Thống kê đơn hàng
          </Link>
        </div>

      )
    }
  }

  if (auth?.user?.roleId === "3") {
    if (action === "view-blog" || action === "edit-blog" || action === "create") {
      return (
        <div className="side-navbar">
          <Link to="/manage-blogs/view-blog" className="side-navbar-link">
            <FaBookOpen className="side-navbar-link-icon" /> Xem bài viết
          </Link>
          <Link to="/create-blog/create" className="side-navbar-link">
            <FaRegEdit className="side-navbar-link-icon" /> Tạo bài viết
          </Link>
          <Link to="/manage-blogs/edit-blog" className="side-navbar-link">
            <FaEdit className="side-navbar-link-icon" /> Chỉnh sửa bài viết
          </Link>
        </div>
      );
    }
    if (action === "view-product" || action === "edit-product") {
      return (
        <div className="side-navbar">
          <Link to="/feedback/view-product" className='side-navbar-link'>
            <FaRegCommentAlt className='side-navbar-link-icon' /> Xem feedback
          </Link>
          <Link to="/feedback/edit-product" className='side-navbar-link'>
            <FaEdit className='side-navbar-link-icon' /> Chỉnh sửa feedback
          </Link>
        </div>
      )
    } else {
      return (
        <div className="side-navbar">
          <Link to="/order/view-order" className='side-navbar-link'>
            <FaRegListAlt className='side-navbar-link-icon' /> Xem đơn hàng
          </Link>
          <Link to="/order/confirm-custom" className='side-navbar-link'>
            <FaBullhorn className='side-navbar-link-icon' /> Xác nhận đơn hàng thiết kế
          </Link>
        </div>
      )
    }
    // } else {
    //   return (
    //     // staff
    //     // quản lí bài viết
    //     // <div className="side-navbar">
    //     //     <Link to="/services" className='side-navbar-link'>
    //     //         <FaBookOpen className='side-navbar-link-icon'/> Xem bài viết
    //     //     </Link>
    //     //     <Link to="/" className='side-navbar-link'>
    //     //         <FaRegEdit className='side-navbar-link-icon'/> Tạo bài viết
    //     //     </Link>
    //     //     <Link to="/about" className='side-navbar-link'>
    //     //         <FaEdit className='side-navbar-link-icon'/> Chỉnh sửa bài viết
    //     //     </Link>
    //     // </div>

    //     // quản lí feedback
    //     // <div className="side-navbar">
    //     //     <Link to="/feedback" className='side-navbar-link'>
    //     //         <FaRegCommentAlt className='side-navbar-link-icon'/> Xem feedback
    //     //     </Link>
    //     //     <Link to="/feedback" className='side-navbar-link'>
    //     //         <FaEdit className='side-navbar-link-icon'/> Chỉnh sửa feedback
    //     //     </Link>
    //     // </div>

    //     //quản lí đơn hàng
    //     // <div className="side-navbar">
    //     //     <Link to="/order/view" className='side-navbar-link'>
    //     //         <FaRegListAlt className='side-navbar-link-icon'/> Xem đơn hàng
    //     //     </Link>
    //     //     <Link to="/order/confirm-custom" className='side-navbar-link'>
    //     //         <FaBullhorn className='side-navbar-link-icon'/> Thông báo đơn hàng thiết kế
    //     //     </Link>
    //     // </div>

    //     //manager
    //     //quản lí sản phẩm
    //     // <div className="side-navbar">
    //     //     <Link to="/product" className='side-navbar-link'>
    //     //         <FaBoxes className='side-navbar-link-icon' /> Xem toàn bộ sản phẩm
    //     //     </Link>
    //     //     <Link to="/add-product" className='side-navbar-link'>
    //     //         <FaDove className='side-navbar-link-icon' /> Thêm lồng chim
    //     //     </Link>
    //     //     <Link to="/add-product" className='side-navbar-link'>
    //     //         <FaBreadSlice className='side-navbar-link-icon' /> Thêm thức ăn cho chim
    //     //     </Link>
    //     //     <Link to="/add-product" className='side-navbar-link'>
    //     //         <FaGift className='side-navbar-link-icon' /> Thêm phụ kiện - đồ chơi
    //     //     </Link>
    //     //     <Link to="/product" className='side-navbar-link'>
    //     //         <FaEdit className='side-navbar-link-icon' /> Chỉnh sửa toàn bộ sản phẩm
    //     //     </Link>
    //     // </div>

    //     //admin
    //     //quản lí account
    //     // <div className="side-navbar">
    //     //   <Link to="/manage-account" className="side-navbar-link">
    //     //     <FaUserAlt className="side-navbar-link-icon" /> Xem toàn bộ tài khoản
    //     //   </Link>
    //     //   <Link to="/create-user" className="side-navbar-link">
    //     //     <FaRegEdit className="side-navbar-link-icon" /> Tạo tài khoản
    //     //   </Link>
    //     // </div>

    //     <div className="side-navbar">
    //       <Link to="/dashboard" className="side-navbar-link">
    //         <FaChartBar className="side-navbar-link-icon" /> Thống kê tổng
    //       </Link>
    //       <Link to="/dashboard/revenue" className="side-navbar-link">
    //         <FaMoneyBillWave className="side-navbar-link-icon" /> Thống kê doanh thu
    //       </Link>
    //       <Link to="/dashboard/inventory" className="side-navbar-link">
    //         <FaBox className="side-navbar-link-icon" /> Thống kê hàng hóa
    //       </Link>
    //       <Link to="/dashboard/order" className="side-navbar-link">
    //         <FaShoppingCart className="side-navbar-link-icon" /> Thống kê đơn hàng
    //       </Link>
    //     </div>
    //   );
  }
};
export default SideNav;
