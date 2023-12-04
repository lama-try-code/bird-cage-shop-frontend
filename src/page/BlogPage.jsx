import React, { useEffect, useState } from "react";
import "./BlogPage.css";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import api from "../components/utils/requestAPI";
import { Link, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PopupModal from "../components/modal/PopupModal";

const BlogPage = () => {
  const { auth } = useAuth();
  const { action } = useParams();

  const [blogItem, setBlogItem] = useState(null);
  const [remove, setRemove] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [result, setResult] = useState(false);
  const [id, setId] = useState("");
  const [success, setSuccess] = useState(false);

  const fetchData = async () => {
    const url = "/api/Blog/get-for-customer";
    try {
      const response = await api.get(url);
      console.log(response.data);
      setBlogItem(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const removeBlog = async (blogId) => {
    console.log(blogId);
    const urlRemove = "/api/Blog/remove-blog";
    const data = {
      blogID: blogId,
    };
    try {
      const response = await api.delete(urlRemove, {
        headers: {
          "Content-Type": "application/json-patch+json",
        },
        data: JSON.stringify(data),
      });
      if (response) {
        console.log(response);
        console.log("yay");
        setSuccess(true);
        setShowPopup(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [removeBlog]);

  const handleShow = (id) => {
    setShowPopup(true);
    setId(id);
  };

  const handleClose = () => {
    setShowPopup(false);
    setShowPopup(false);
    setSuccess(false);
  };

  if (result) {
    console.log("huhu");
    removeBlog(id);
    setResult(false);
    setShowPopup(false);
    setSuccess(false);
  }

  function formatDate(date) {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  if (auth?.user?.roleId === "3") {
    if (action === "view-blog") {
      return (
        <div className="blog-page">
          <div className="blog-list">
            {blogItem?.map((blog) => (
              <Link
                to={`/view-blog/${blog.blogId}`}
                key={blog.blogId}
                className="blog-item"
              >
                <div className="blog-item-detail">
                  <div className="blog-item-image">
                    {blog.image.map((image) => (
                      <img src={image?.imageUrl} alt="blog-image" />
                    ))}
                  </div>
                  <div className="blog-item-information">
                    <h3 className="blog-title">{blog.blogTitle}</h3>
                    <p className="blog-meta">
                      <span className="blog-date">{formatDate(blog.createAt)}</span> .{" "}
                      <span className="blog-author">
                        bởi {blog.user.fullName}
                      </span>
                    </p>
                    <p className="blog-description">{blog.blogSummary}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      );
    }
    if (action === 'edit-blog') {
      return (
        <div className="blog-page">
          <div className="blog-list">
            {blogItem?.map((blog) => (
              <div className="blog-item">
                <div className="role-page-edit-button">
                  <button
                    onClick={() => handleShow(blog.blogId)}
                    className="remove-button"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
                <div className="blog-item-detail">
                  <div className="blog-item-image">
                    {blog.image.map((image) => (
                      <img src={image?.imageUrl} alt="blog-image" />
                    ))}
                  </div>
                  <div className="blog-item-information">
                    <h3 className="blog-title">{blog.blogTitle}</h3>
                    <p className="blog-meta">
                      <span className="blog-date">{formatDate(blog.createAt)}</span> .{" "}
                      <span className="blog-author">
                        bởi {blog.user.fullName}
                      </span>
                    </p>
                    <p className="blog-description">{blog.blogSummary}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {showPopup && (
            <PopupModal
              action={"remove"}
              open={showPopup}
              onClose={handleClose}
              statusReturn={result}
              setStatusReturn={setResult}
            />
          )}
          {success && (
            <PopupModal
              action={"remove success"}
              open={showPopup}
              onClose={handleClose}
            />
          )}
        </div>
      );
    }
  }

  return (
    <div className="blog-page">
      <div className="blog-list">
        {blogItem?.map((blog) => (
          <Link
            to={`/blog-content/${blog.blogId}`}
            key={blog.blogId}
            className="blog-item"
          >
            <div className="blog-item-detail">
              <div className="blog-item-image">
                {blog.image.map((image) => (
                  <img src={image?.imageUrl} alt="blog-image" />
                ))}
              </div>
              <div className="blog-item-information">
                <h3 className="blog-title">{blog.blogTitle}</h3>
                <p className="blog-meta">
                  <span className="blog-date">{formatDate(blog.createAt)}</span> .{" "}
                  <span className="blog-author">bởi {blog.user.fullName}</span>
                </p>
                <p className="blog-description">{blog.blogSummary}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>

    // quản lí blog của staff (thêm 2 nút xóa và sửa)
    // <div className="blog-page">
    //   <div className="blog-list">
    //     {blogs.map((blog) => (
    //       <div className="blog-item">
    //         <div className="role-page-edit-button">
    //           <button onClick={handleButtonClick} className="update-button"><FaRegEdit /></button>
    //           <button onClick={() => removeBlog(blog.id)} className="remove-button"><FaTrashAlt /></button>
    //         </div>
    //         <div className="blog-item-detail">
    //           <div className="blog-item-image">
    //             <img src={blog.image} alt="blog-image" />
    //           </div>
    //           <div className="blog-item-information">
    //             <h3 className="blog-title">{blog.title}</h3>
    //             <p className="blog-meta">
    //               <span className="blog-date">{blog.date}</span> . <span className="blog-author">bởi {blog.author}</span>
    //             </p>
    //             <p className="blog-description">{blog.content}</p>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default BlogPage;
