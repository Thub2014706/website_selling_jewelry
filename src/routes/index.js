import thunghiem from '~/components/AdminProduct/FormProduct';
import AdminPage from '~/pages/AdminPage/AdminPage';
import CartPage from '~/pages/CartPage/CartPage';
import CheckoutPage from '~/pages/CheckoutPage/CheckoutPage';
import HomePage from '~/pages/HomePage/HomePage';
import LoginPage from '~/pages/LoginPage/LoginPage';
import AllAddressPage from '~/pages/MyAddressPage/MyAddressPage';
import MyOrderPage from '~/pages/MyOrderPage/MyOrderPage';
import NoPage from '~/pages/NoPage/NoPage';
import ProductDetailsPage from '~/pages/ProductDetailsPage/ProductDetailsPage';
import RegisterPage from '~/pages/RegisterPage/RegisterPage';
import ShipperPage from '~/pages/ShipperPage/ShipperPage';
import ShopPage from '~/pages/ShopPage/ShopPage';
import WishlistPage from '~/pages/WishlistPage/WishlistPage';

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
        path: '/search',
        search: '?query=name',
        component: ShopPage,
    },
    {
        path: '/shop',
        component: ShopPage,
    },
    {
        path: '/type/:type',
        component: ShopPage,
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
        path: '/myorder',
        component: MyOrderPage,
    },
    {
        path: '/wishlist',
        component: WishlistPage,
    },
    {
        path: '/myaddress',
        component: AllAddressPage,
    },
];

const adminRoutes = [
    {
        path: '/admin',
        component: AdminPage,
        layout: null,
    },
];

const shipperRoutes = [
    {
        path: '/ship',
        component: ShipperPage,
        layout: null,
    },
];

export { publicRoutes, privateRoutes, adminRoutes, shipperRoutes };
