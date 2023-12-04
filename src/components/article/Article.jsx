import React, { useEffect, useState } from "react";
import "./Article.css";
import { Link } from "react-router-dom";
import api from "../utils/requestAPI";

const Article = () => {
  const [suggestedArticles, setSuggestedArticles] = useState(null);

  const fetchData = async () => {
    const url = "/api/Blog/get-first-4-blogs";
    try {
      const response = await api.post(url);
      console.log(response.data);
      setSuggestedArticles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function formatDate(date) {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="blogs-section">
      <h3>Cẩm nang về chim</h3>
      <div className="blogs-container">
        {suggestedArticles?.map((article) => (
          <div className="blog-container">
            <Link
              to={`/blog-content/${article.blogId}`}
              className="article-link"
              key={article.blogId}
            >
              <div className="blog-container-img">
                {article?.image?.map((img) => (
                  <img src={img.imageUrl} alt={article.blogTitle} />
                ))}
              </div>
              <h4 className="article-title">{article.blogTitle}</h4>
              <p className="article-meta">
                <span className="article-date">
                  {formatDate(article.createAt)}
                </span>{" "}
                .{" "}
                <span className="article-author">
                  bởi {article?.user.fullName}
                </span>
              </p>
              <p className="blog-container-link">Xem chi tiết &raquo;</p>
            </Link>
          </div>
        ))}
      </div>
      <Link to="/blogs">
        <button type="submit" className="blogs-section-link-button">
          Xem thêm
        </button>
      </Link>
    </div>
  );
};

export default Article;
