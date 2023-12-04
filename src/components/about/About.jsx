import React, { useEffect, useState } from "react";
import './About.css';
import api from "../utils/requestAPI";

const About = ({ birdId }) => {

    const [bird, setBird] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const url = `/api/Bird/get-bird-by-id?id=${birdId}`;
            try {
                const response = await api.get(url);
                console.log(response.data);
                setBird(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [birdId])

    return (
        <div className="about-container">
            <div className="about-section">
                <div className="image-container">
                    <img src={bird?.image[0]?.imageUrl} alt={bird?.birdName} key={bird?.birdId} />
                </div>
                <div className="description-container">
                    <h2>{bird?.birdName}</h2>
                    <p>{bird?.description}</p>
                </div>
            </div>
        </div>
    )
}

export default About;