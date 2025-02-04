import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { publicRout, privateRout } from '../router/router';
import PrivateRoute from './PrivateRoute';

const AppRouter = () => {
    return (
        <Routes>
            {/* Публичные маршруты */}
            {publicRout.map((route, index) => (
                <Route
                    path={route.path}
                    element={route.component}
                    exact={route.exact}
                    key={index}
                />
            ))}

            {/* Приватные маршруты */}
            {privateRout.map((route, index) => (
                <Route
                    path={route.path}  // Путь маршрута
                    element={<PrivateRoute component={() => route.component} />} // Применяем компонент PrivateRoute для защиты маршрута
                    exact={route.exact}  // Устанавливаем точность совпадения маршрута
                    key={index}  // Уникальный ключ для маршрута
                />
            ))}
        </Routes>
    );
};

export default AppRouter;
