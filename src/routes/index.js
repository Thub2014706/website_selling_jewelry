import AdminAddCategories from '~/components/AdminProduct/AdminAddCategories';
import AdminAddProduct from '~/components/AdminProduct/AdminAddProduct';
import AdminAllProduct from '~/components/AdminProduct/AdminAllProduct';
import AdminUpdateProduct from '~/components/AdminProduct/AdminUpdateProduct';
import thunghiem from '~/components/AdminProduct/FormProduct';
import CartPage from '~/pages/CartPage/CartPage';
import CheckoutPage from '~/pages/CheckoutPage/CheckoutPage';
import HomePage from '~/pages/HomePage/HomePage';
import LoginPage from '~/pages/LoginPage/LoginPage';
import MyOrderPage from '~/pages/MyOrderPage/MyOrderPage';
import NoPage from '~/pages/NoPage/NoPage';
import ProductDetailsPage from '~/pages/ProductDetailsPage/ProductDetailsPage';
import ProductPage from '~/pages/ProductPage/ProductPage';
import RegisterPage from '~/pages/RegisterPage/RegisterPage';

const publicRoutes = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '*',
        component: NoPage,
    },
    {
        path: '/product/:id',
        component: ProductDetailsPage,
    },
    {
        path: '/signin',
        component: LoginPage,
        layout: null,
    },
    {
        path: '/signup',
        component: RegisterPage,
        layout: null,
    },
    {
        path: '/cart',
        component: CartPage,
    },
    {
        path: '/admin/get-products',
        component: AdminAllProduct,
        layout: null,
    },
    {
        path: '/admin/update-product/:id',
        component: AdminUpdateProduct,
        layout: null,
    },
    {
        path: '/admin/add-product',
        component: AdminAddProduct,
        layout: null,
    },
    {
        path: '/search/:name',
        component: ProductPage,
    },
    {
        path: '/admin/add-categories',
        component: AdminAddCategories,
    },
    {
        path: '/thunghiem',
        component: thunghiem,
    },
];

const privateRoutes = [
    {
        path: '/checkout',
        component: CheckoutPage,
    },
    {
        path: '/myorder/:id',
        component: MyOrderPage,
    },
];

export { publicRoutes, privateRoutes };
