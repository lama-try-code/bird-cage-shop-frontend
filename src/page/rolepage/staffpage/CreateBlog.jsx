import React, { useState } from "react";
import "./CreateBlog.css";
import useAuth from "../../../hooks/useAuth";
import api from "../../../components/utils/requestAPI";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../components/utils/firebase";
import ComboBox from "../../../components/combobox/ComboBox";

const BlogForm = () => {
  const { auth } = useAuth();

  const [img, setImg] = useState("");

  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [imageUrls, setImageUrls] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    const data = await event.target.files[0].arrayBuffer();
    const metadata = {
      contentType: "image/png",
    };
    const storageRef = ref(storage, `/lama/${event.target.value}`);
    await uploadBytes(storageRef, data, metadata);

    const imageUrl = await getDownloadURL(storageRef);

    console.log(imageUrl);

    setImageUrls(imageUrl);

    reader.onload = () => {
      setImg(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("y");

    const url = "/api/Blog/create-blog";
    const data = {
      title: blogTitle,
      content: blogContent,
      type: "post",
      usreID: auth?.user?.userId,
      createTime: createdAt,
      imageUrl: imageUrls,
    };

    setIsLoading(true);
    try {
      console.log(data);
      const response = await api.post(url, data);
      console.log(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }

    if (isLoading) {
      return;
    }
  };

  return (
    <div className="create-blog-page">
      <div className="create-blog-container">
        <h2 className="create-blog-container-title">Tạo bài viết</h2>
        <div className="create-blog-section">
          <form onSubmit={handleSubmit}>
            <div>
              <div className="create-blog-input-container">
                <label htmlFor="blogTitle">Tiêu đề</label>
                <input
                  className="create-blog-input"
                  type="text"
                  id="blogTitle"
                  placeholder="Nhập tiêu đề bài viết"
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                />
              </div>
              <div className="create-blog-input-container">
                <label htmlFor="blogContent">Nội dung</label>
                <div
                  className="create-blog-input create-blog-textarea"
                  id="blogContent"
                  placeholder="Nhập nội dung bài viết"
                  value={blogContent}
                  contentEditable="true"
                  onInput={(e) => setBlogContent(e.target.innerHTML)}
                ></div>
              </div>
              <div className="create-blog-input-container">
                <label htmlFor="blogTitle">Loại bài viết</label>
                <ComboBox
                  className={"blogtype"}
                  // onChange={(e) => setBlogType(e.target.value)}
                />
              </div>

              <div className="create-blog-input-container">
                <label htmlFor="createdAt">Ngày tạo</label>
                <input
                  className="create-blog-input"
                  type="date"
                  id="createdAt"
                  value={createdAt}
                  onChange={(e) => setCreatedAt(e.target.value)}
                />
              </div>
              <div className="create-blog-input-container">
                <label htmlFor="imageUpload" className="mutiple-img-upload">
                  Thêm hình ảnh
                </label>
                <input
                  // className='create-blog-input'
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
              </div>
              <div className="blog-add-image">
                <img src={img} alt="Product A" className="product-cage-img" />
              </div>
              <button type="submit" className="create-blog-post">
                Đăng bài
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;
