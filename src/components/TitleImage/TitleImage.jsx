import React from 'react';

const TitleImage = ({title, img}) => {
    return (
        <div style={{ position: 'relative', width: '100%' }}>
            <img src={img} className="w-100" />
            <span
                className="h2 fst-italic text-black fw-bold"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                {title}
            </span>
        </div>
    );
};

export default TitleImage;
