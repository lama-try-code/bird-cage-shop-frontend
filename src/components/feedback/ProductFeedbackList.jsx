import React, { useEffect, useState } from "react";
import './Feedback.css'
import PopupModal from "../modal/PopupModal";
import { FaTrashAlt } from "react-icons/fa";
import api from "../utils/requestAPI";

const ProductFeedbackList = ({ productId, action }) => {

    const [feedbacks, setFeedbacks] = useState();
    const [result, setResult] = useState(false);
    const [id, setId] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fetchData = async () => {
        const url = `/api/Feedback/get-feedback-by-product-id?productId=${productId}`;
        try {
            const response = await api.get(url);
            console.log(response.data);
            setFeedbacks(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        const url = `/api/Feedback/remove-feedback-by-id?feedbackId=${id}`;
        try {
            const response = await api.delete(url);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [handleDelete]);

    const handlePopup = (id) => {
        setShowPopup(true);
        setId(id);
    };

    const handleClose = () => {
        setShowPopup(false);
    };

    if (result) {
        handleDelete(id);
        setResult(false);
    }

    const feedbackList = [
        {
            img: "./vet.jpg",
            userName: "user1",
            content: "product-feedback-detailproduct-feedback-detail",
        },
        {
            img: "./vet.jpg",
            userName: "user2",
            content: "product-feedback-detail",
        },
        {
            img: "./sao.jpg",
            userName: "user3",
            content: "product-feedback-detailproduct-feedback-detail",
        },
        {
            img: "./sao.jpg",
            userName: "user4",
            content: "product-feedback-detailproduct-feedback-detailproduct-feedback-detailproduct-feedback-detail",
        },
    ]

    if (action === "edit-product") {
        return (
            <div className="feedback-section">
                <h3 className='feedback-heading'>Đánh giá sản phẩm</h3>
                <div className="product-feedback-list">
                    {feedbacks?.map((feedback) => (
                        <div className="product-feedback-item">
                            <button
                                className="remove-button"
                                onClick={() => handlePopup(feedback.feedbackId)}
                            >
                                <FaTrashAlt />
                            </button>
                            {showPopup && (
                                <PopupModal
                                    action={"remove"}
                                    statusReturn={result}
                                    setStatusReturn={setResult}
                                    open={showPopup}
                                    onClose={handleClose}
                                />
                            )}
                            <img src={feedback.img} alt="" className="product-feedback-user-avatar"></img>
                            <div className="product-feedback-detail">
                                <h4 className="product-feedback-detail-username">{feedback.userName}</h4>
                                <p className="product-feedback-detail-content">{feedback.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    } else {
        return (
            <div className="feedback-section">
                <h3 className='feedback-heading'>Đánh giá sản phẩm</h3>
                <div className="product-feedback-list">
                    {feedbacks?.map((feedback) => (
                        <div className="product-feedback-item">
                            <img src={feedback.img} alt="" className="product-feedback-user-avatar"></img>
                            <div className="product-feedback-detail">
                                <h4 className="product-feedback-detail-username">{feedback.userName}</h4>
                                <p className="product-feedback-detail-content">{feedback.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default ProductFeedbackList;