import React, { Fragment } from 'react';
import About from '../components/about/About';
import Carousel from '../components/carousel/Carousel';
import CageList from '../components/cage-list/CageList'
import './SpeciesPage.css';
import { useParams } from 'react-router-dom';

const SpeciesPage = () => {
    const { birdId } = useParams();
    return (
        <Fragment>
            <About birdId={birdId}/>
            <div className="bird-of-species-section">
                <h3>Lồng phù hợp với chim</h3>
                <CageList birdId={birdId}/>
            </div>
            <div className="different-species-carousel">
                <h3>Các loài chim khác</h3>
                <Carousel className="Bird"/>
            </div>
        </Fragment>
    );
}

export default SpeciesPage;
