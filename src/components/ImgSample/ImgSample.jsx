import React, { useEffect, useState } from 'react';
import { getImage } from '~/services/ProductService';

const ImgSample = ({ pathImg, style, className, onClick }) => {
    const [img, setImg] = useState(null);
    useEffect(() => {
        const fetch = async () => {
            const data = await getImage(pathImg);
            setImg(data);
        };
        fetch()
    }, [pathImg]);
    // console.log(img)
    return img !== null && <img src={img} style={style} className={className} onClick={onClick} />;
};

export default ImgSample;
