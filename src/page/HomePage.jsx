import React, { Fragment, useEffect } from "react";
import "./HomePage.css";
import Slider from "../components/slider/Slider.jsx";
import Carousel from "../components/carousel/Carousel";
import Article from "../components/article/Article";
import useAuth from "../hooks/useAuth.jsx";

const HomePage = () => {
  const { auth } = useAuth();

  const fetchData = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get("status");

    if (status === "success") {
      window.prompt("Payment Successful!");
      localStorage.clear();
      auth.user = null;
    } else if (status === "failure") {
      window.prompt("Payment Failed!");
    }
  };
  useEffect(() => {
    fetchData();
  });
  return (
    <Fragment>
      <Slider />
      <div className="home-page-carousel-section">
        <h3>Loài chim</h3>
        <Carousel className="Bird" />
        <h3>Lồng chim</h3>
        <Carousel className="Product" />
        <h3>Thức ăn cho chim</h3>
        <Carousel className="Food" />
        <h3>Phụ kiện - Đồ chơi</h3>
        <Carousel className="Toy" />
      </div>
      <Article />
    </Fragment>
  );
};

export default HomePage;
