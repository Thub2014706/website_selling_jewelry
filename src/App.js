import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { adminRoutes, privateRoutes, publicRoutes, shipperRoutes } from '~/routes';
import { MainLayout } from '~/layouts';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from './createInstance';
import { axiosJWT, refreshToken } from './redux/apiRequest';
import { jwtDecode } from 'jwt-decode';
import { loginSuccess } from './redux/authSlice';

function App() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    console.log(user);

    // axiosJWT.interceptors.request.use(
    //     //trước khi gửi request nào đó thì interceptors sẽ check này trước khi gọi api nào đó
    //     async (config) => {
    //         let decodedToken = jwtDecode(user?.accessToken);
    //         if (decodedToken.exp < new Date().getTime() / 1000) {
    //             try {
    //                 const newToken = await refreshToken();
    //                 // console.log(newToken.accessToken)
    //                 if (newToken) {
    //                     const newData = user?.data;

    //                     const refreshUser = {
    //                         data: newData,
    //                         accessToken: newToken.accessToken,
    //                     };
    //                     // console.log("thu nghiem", refreshUser)
    //                     dispatch(loginSuccess(refreshUser));
    //                     config.headers.Authorization = 'Bearer ' + newToken.accessToken;
    //                 }
    //             } catch (error) {
    //                 console.log(error);
    //             }
    //         }
    //         return config;
    //     },
    //     (err) => {
    //         return Promise.reject(err);
    //     },
    // );

    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => (
                        // const Layout = route.layout === null ? Fragment : MainLayout;
                        // const Page = route.component;
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                route.layout === null ? (
                                    <Fragment>
                                        <route.component />
                                    </Fragment>
                                ) : (
                                    <MainLayout>
                                        <route.component />
                                    </MainLayout>
                                )
                            }
                            // element={
                            //     <Layout>
                            //         <Page />
                            //     </Layout>
                            // }
                        />
                    ))}

                    {privateRoutes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                user ? (
                                    route.layout === null ? (
                                        <Fragment>
                                            <route.component />
                                        </Fragment>
                                    ) : (
                                        <MainLayout>
                                            <route.component />
                                        </MainLayout>
                                    )
                                ) : (
                                    <Navigate to="/signin" replace />
                                )
                            }
                        />
                    ))}

                    {adminRoutes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                user && user.data.isAdmin === true ? (
                                    route.layout === null ? (
                                        <Fragment>
                                            <route.component />
                                        </Fragment>
                                    ) : (
                                        <MainLayout>
                                            <route.component />
                                        </MainLayout>
                                    )
                                ) : (
                                    <Navigate to="*" replace />
                                )
                            }
                        />
                    ))}
                    {shipperRoutes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                user && user.data.shipper === true ? (
                                    route.layout === null ? (
                                        <Fragment>
                                            <route.component />
                                        </Fragment>
                                    ) : (
                                        <MainLayout>
                                            <route.component />
                                        </MainLayout>
                                    )
                                ) : (
                                    <Navigate to="*" replace />
                                )
                            }
                        />
                    ))}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
