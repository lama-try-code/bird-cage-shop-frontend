import React from "react";
import "./Footer.css"
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div id="footer-section">
            <div className="footer-content">
                <div className="footer-shop-section">
                    <h2 className="footer-heading">Bird Cage Shop</h2>
                    <p>Địa chỉ: 21 đường số 6, phường Linh Chiểu, TP. Thủ Đức</p>
                    <p>Điện thoại: 123 456 789 - 987 654 321</p>
                    <p>Website: </p>
                    <p>Email: birdcageshop@gmail.com</p>
                </div>

                <div className="footer-about-section">
                    <h2 className="footer-heading">Tìm hiểu</h2>
                    <a href="/about-us" className="footer-link">Giới thiệu</a>
                    <p>Liên hệ</p>
                    <a href="/term-condition" className="footer-link">Điều khoản và điều kiện</a>
                </div>

                <div className="footer-products-section">
                    <h2 className="footer-heading">Sản phẩm</h2>
                    <a href="/products/cages" className="footer-link">Lồng chim</a>
                    <a href="/products/food" className="footer-link">Thức ăn cho chim</a>
                    <a href="/products/accessories-toys" className="footer-link">Phụ kiện - Đồ chơi</a>
                </div>
            </div>


            <h5 className="copyright">Copyright © 2023 by Bird Cage Shop</h5>

        </div>
    )
}

export default Footer;