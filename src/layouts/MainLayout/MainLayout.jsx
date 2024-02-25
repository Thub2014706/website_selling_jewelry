import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import TextStatus from '../components/TextStatus/TextStatus';

const MainLayout = ({ children }) => {
    return (
        <div>
            <TextStatus />
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default MainLayout;
