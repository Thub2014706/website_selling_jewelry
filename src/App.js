import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '~/routes';
import { MainLayout } from '~/layouts';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';

function App() {
    const user = useSelector((state) => state.auth.login.currentUser);

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
                </Routes>
            </div>
        </Router>
    );
}

export default App;
