import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import TextStatus from '../components/TextStatus/TextStatus';

const MainLayout = ({ children }) => {
    return (
        <div className="min-vh-100 d-flex flex-column justify-content-between">
            <TextStatus />
            <Header />
            <main className="mb-auto">{children}</main>
            <Footer />
        </div>
    );
};

export default MainLayout;
