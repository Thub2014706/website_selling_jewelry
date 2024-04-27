import { faFacebook, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '~/assets/images/logo2.png';

const Footer = () => {
    return (
        <div className='mt-5'>
            <Container fluid className="shadow" style={{ backgroundColor: 'var(--primary-color)' }}>
                <Container>
                    <Row className="py-3">
                        <Col>
                            <img src={logo} style={{ width: '50px' }} alt="" />
                        </Col>
                        <Col className='d-flex align-items-center justify-content-center'>
                            <p className="text-white">&copy; 2024, Nguyen Bach Gia Thu B2014706</p>
                        </Col>
                        <Col className='d-flex align-items-center justify-content-end'>
                            <Link>
                                <FontAwesomeIcon color='white' size='2xl' icon={faFacebook} />
                            </Link>
                            <Link>
                                <FontAwesomeIcon className='ms-3' color='white' size='2xl' icon={faInstagram} />
                            </Link>
                            <Link>
                                <FontAwesomeIcon className='ms-3' color='white' size='2xl' icon={faTiktok} />
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </div>
    );
};

export default Footer;
