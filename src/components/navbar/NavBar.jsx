import React, { useState } from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  SubNav,
  SubNavItem,
} from "./NavbarElements.jsx";
import "./NavBar.css";
import {
  FaRegListAlt,
  FaShoppingCart,
  FaSignOutAlt,
  FaUserEdit,
} from "react-icons/fa";
import SearchBar from "../search/SearchBar.jsx";
import useAuth from "../../hooks/useAuth.jsx";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";

const Navbar = ({ className }) => {
  const [showSubNav, setShowSubNav] = useState(false);

  const navigate = useNavigate();

  const handleImgClick = () => {
    setShowSubNav(!showSubNav);
  };

  const { auth } = useAuth();
  if (auth.user) {
    const Logout = () => {
      localStorage.clear();
      auth.user = null;
      () => window.location.reload(false);
      navigate("/home");
    };
    return (
      <nav className={`navbar ${className}`}>
        <Nav id="navbar">
          <Bars />
          <div id="logo">
            <Link to="/home">
              <img src="/bcs-icon.png" alt="bcs-logo" />
              {/* <img src="https://firebasestorage.googleapis.com/v0/b/bscswp.appspot.com/o/localImage%2Fbcs-icon.png?alt=media&token=cba6ce82-1150-4239-83ac-9a61b5ae4382" alt="bcs-logo" /> */}
            </Link>
          </div>
          <NavMenu className="first-section">
            <NavLink to="/home" className="first-section-component">
              Trang chủ
            </NavLink>
            <NavLink className="first-section-component">
              Sản phẩm
              <SubNav>
                <SubNavItem to="/products/cages">Lồng chim</SubNavItem>
                <SubNavItem to="/products/food">Thức ăn cho chim</SubNavItem>
                <SubNavItem to="/products/accessories-toys">
                  Phụ kiện - Đồ chơi
                </SubNavItem>
              </SubNav>
            </NavLink>
            <NavLink to="/blogs" className="first-section-component">
              Bài viết
            </NavLink>
            <NavLink to="/about-us" className="first-section-component">
              Giới thiệu
            </NavLink>
          </NavMenu>
          <NavMenu className="second-section">
            <SearchBar className="search" />
            <NavLink to="/cart">
              <FaShoppingCart className="cart-icon" />
            </NavLink>
          </NavMenu>
          <NavMenu className="third-section">
            <p className="navbar-user-name">{auth.user.fullName}</p>
            <NavLink>
              <img
                src="/chaomao.png"
                // src="https://firebasestorage.googleapis.com/v0/b/bscswp.appspot.com/o/default-non-user-no-photo-1.jpg?alt=media&token=64d98533-d6cc-4560-a48e-d2e75686045c"
                alt=""
                className="navbar-user-img"
                onClick={handleImgClick}
              />

              {showSubNav && (
                <div className="navbar-user-img-subnav">
                  <SubNavItem
                    to={`/update-info/${auth?.user?.userId}`}
                    className="navbar-user-img-subnav-link"
                  >
                    <FaUserEdit /> Chỉnh sửa thông tin
                  </SubNavItem>
                  <SubNavItem
                    to="/order-confirm"
                    className="navbar-user-img-subnav-link"
                  >
                    <FaRegListAlt /> Đơn hàng của bạn
                  </SubNavItem>
                  <SubNavItem
                    to="/home"
                    className="navbar-user-img-subnav-link"
                    onClick={Logout}
                  >
                    <FaSignOutAlt />
                    Đăng xuất
                  </SubNavItem>
                </div>
              )}
            </NavLink>
          </NavMenu>
        </Nav>
      </nav>
    );
  } else {
    return (
      <nav className={`navbar ${className}`}>
        <Nav id="navbar">
          <Bars />
          <div id="logo">
            <Link to="/home">
              <img src="/bcs-icon.png" alt="bcs-logo" />
              {/* <img src="https://firebasestorage.googleapis.com/v0/b/bscswp.appspot.com/o/localImage%2Fbcs-icon.png?alt=media&token=cba6ce82-1150-4239-83ac-9a61b5ae4382" alt="bcs-logo" /> */}
            </Link>
          </div>
          <NavMenu className="first-section">
            <NavLink to="/home" className="first-section-component">
              Trang chủ
            </NavLink>
            <NavLink className="first-section-component">
              Sản phẩm
              <SubNav>
                <SubNavItem to="/products/cages">Lồng chim</SubNavItem>
                <SubNavItem to="/products/food">Thức ăn cho chim</SubNavItem>
                <SubNavItem to="/products/accessories-toys">
                  Phụ kiện - Đồ chơi
                </SubNavItem>
              </SubNav>
            </NavLink>
            <NavLink to="/blogs" className="first-section-component">
              Bài viết
            </NavLink>
            <NavLink to="/about-us" className="first-section-component">
              Giới thiệu
            </NavLink>
          </NavMenu>

          <NavMenu className="second-section">
            <SearchBar className="search" />
            <NavLink to="/cart">
              <FaShoppingCart className="cart-icon" />
            </NavLink>
          </NavMenu>
          <NavMenu className="third-section">
            <NavLink to="/log-in">Đăng nhập</NavLink>
            <NavLink to="/sign-up">Đăng ký</NavLink>
          </NavMenu>
        </Nav>
      </nav>
    );
  }
};

export default Navbar;
