import React, { useEffect, useState } from "react";
import "./RelatedPost.css";
import api from "../utils/requestAPI";
import { Link } from "react-router-dom";

const RelatedPost = ({ blogType }) => {
  const [relatedPosts, setRelatedPosts] = useState(null);

  const fetchData = async () => {
    const url = `/api/Blog/suggest-blogs-bloginformatinpage?type=${blogType}`;
    try {
      const response = await api.post(url);
      console.log(response.data);
      setRelatedPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [blogType]);

  return (
    <div className="related-post-section">
      <h3>Bài viết liên quan</h3>
      <div className="related-post-container">
        {relatedPosts?.map((relatedpost) => (
          <div key={relatedpost.blogId} className="related-post-item">
            <Link to={`/blog-content/${relatedpost.blogId}`}>
              <div className="related-post-item-img">
                <img
                  src={relatedpost.image[0].imageUrl}
                  alt={relatedpost.blogTitle}
                />
              </div>
              <h4 className="related-post-title">{relatedpost.blogTitle}</h4>
              <p className="related-post-meta">
                <span className="related-post-date">
                  {relatedpost.createAt}
                </span>{" "}
              </p>
              <p className="related-post-item-link">Xem chi tiết &raquo;</p>
            </Link>
          </div>
        ))}
        ,
      </div>
    </div>
  );
};

export default RelatedPost;
