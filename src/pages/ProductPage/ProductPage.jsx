import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Product from '~/components/Product/Product';
import TitleImage from '~/components/TitleImage/TitleImage';
import { allProduct } from '~/services/ProductService';
import title from '~/assets/images/title3.png';

const ProductPage = () => {
    const search = useSelector((state) => state.product.search);

    const [products, setProducts] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await allProduct();
            console.log(search)
            if (search !== '') {
                const newData = data.filter((item) =>
                    item.name
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .toLowerCase()
                        .includes(
                            search
                                .normalize('NFD')
                                .replace(/[\u0300-\u036f]/g, '')
                                .toLowerCase(),
                        ),
                );
                setProducts(newData);
            } else setProducts(data);
        };
        fetchProducts();
    }, [search]);
    // console.log(products)

    return (
        <div>
            <TitleImage title="SHOP" img={title} />
            {products !== null && (
                <Row className='mt-3'>
                    <Col sm={4}></Col>
                    <Col sm={8}>
                        <Row className='p-3 shadow'>
                            <span className='d-flex'>
                                <h5>Sắp xếp theo: </h5>
                                <Button variant='light'>Khuyến mãi</Button>
                                <Button variant='light'>Bán chạy</Button>
                                <Button variant='light'>Mới nhất</Button>
                            </span>
                        </Row>
                        <Row className='mt-3'>
                            {products.map((product) => (
                                <Col sm={4}>
                                    <Product
                                        key={product._id}
                                        image={product.image}
                                        name={product.name}
                                        price={product.price}
                                        discount={product.discount}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            )}
        </div>
    );
};

export default ProductPage;
