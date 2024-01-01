import React from 'react';
import { Carousel } from 'react-bootstrap';

const TextStatus = () => {
    return (
        <div className='pt-1' style={{ backgroundColor: 'var(--grey-color)' }}>
            <Carousel className='w-50 mx-auto' interval={4000} controls={false} indicators={false}>
                <Carousel.Item>
                    <h6 className="text-center">
                        <i>MIỄN PHÍ GIAO HÀNG TOÀN QUỐC</i>
                    </h6>
                </Carousel.Item>
                <Carousel.Item>
                    <h6 className="text-center">
                        <i>NHẬN ĐỔI TRẢ THEO YÊU CẦU CỦA KHÁCH HÀNG</i>
                    </h6>
                </Carousel.Item>
                <Carousel.Item>
                    <h6 className="text-center">
                        <i>TẶNG PHIẾU QUÀ TẶNG CHO HÓA ĐƠN 50TR</i>
                    </h6>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default TextStatus;
