import React, { useEffect, useState } from 'react';
import './CageList.css'; // Import the CSS file
import api from '../utils/requestAPI';
import { Link } from 'react-router-dom';

const CageList = ({birdId}) => {

    const [cage, setCage] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const url = `/api/Product/get-bird-by-id?birdID=${birdId}`;
            try {
                const response = await api.get(url);
                console.log(response.data);
                setCage(response.data);
            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, []);

    function formatCash(currency) {
        return currency?.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return (
        <div className="list-item">
            {cage?.map((product) => (
                <Link to={`/item-info/${product.productId}`} className="list-item-container" key={product.productId}>
                    <div className="list-item-image">
                        {product.image.map((image) => (
                            <img src={image.imageUrl} alt="Cage" key={image.imageId} />
                        ))}
                    </div>
                    <div className="list-item-details">
                        <h4 className="list-item-title">{product.productName}</h4>
                        <p className="list-item-price">₫{formatCash(product.price)}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default CageList;
