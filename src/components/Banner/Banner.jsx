import React from 'react';
import  Carousel  from 'react-bootstrap/Carousel';
import banner1 from '~/assets/images/banner1.png';
import banner2 from '~/assets/images/banner2.png';
import banner3 from '~/assets/images/banner3.png';

const Banner = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <img src={banner1} className="d-block h-100" alt="" />
            </Carousel.Item>
            <Carousel.Item>
                <img src={banner2} className="d-block h-100" alt="" />
            </Carousel.Item>
            <Carousel.Item>
                <img src={banner3} className="d-block h-100" alt="" />
            </Carousel.Item>
        </Carousel>
    );
};

export default Banner;
