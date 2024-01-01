import HomePage from '~/pages/HomePage/HomePage';
import LoginPage from '~/pages/LoginPage/LoginPage';
import NoPage from '~/pages/NoPage/NoPage';
import ProductDetailsPage from '~/pages/ProductDetailsPage/ProductDetailsPage';
import RegisterPage from '~/pages/RegisterPage/RegisterPage';

const publicRoutes = [
    { 
        path: '/', 
        component: HomePage 
    },
    { 
        path: '*', 
        component: NoPage 
    },
    { 
        path: '/product', 
        component: ProductDetailsPage, 
        layout: null 
    },
    {
        path:'/signin',
        component: LoginPage,
        layout: null
    },
    {
        path:'/signup',
        component: RegisterPage,
        layout: null
    }
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
