import React from 'react';  // Импортируем React для использования функциональных компонентов
import { Route, Routes } from 'react-router-dom';  // Импортируем компоненты для маршрутизации
import { publicRout, privateRout } from '../router/router';  // Импортируем публичные и приватные маршруты
import PrivateRoute from './PrivateRoute';  // Импортируем компонент PrivateRoute для защиты приватных маршрутов

const AppRouter = () => {
    return (
        <Routes>
            {/* Публичные маршруты */}
            {/* Проходим через массив publicRout и создаем Route для каждого маршрута */}
            {publicRout.map((route, index) => (
                <Route
                    path={route.path}  // Путь маршрута
                    element={route.component}  // Компонент, который будет рендериться по этому маршруту
                    exact={route.exact}  // Указание, что маршрут должен точно совпадать с путем
                    key={index}  // Уникальный ключ для каждого маршрута
                />
            ))}

            {/* Приватные маршруты */}
            {/* Проходим через массив privateRout и защищаем маршруты с помощью компонента PrivateRoute */}
            {privateRout.map((route, index) => (
                <Route
                    path={route.path}  // Путь маршрута
                    element={<PrivateRoute component={() => route.component} />}  // Используем PrivateRoute для защиты маршрута
                    exact={route.exact}  // Указание, что маршрут должен точно совпадать с путем
                    key={index}  // Уникальный ключ для каждого маршрута
                />
            ))}
        </Routes>
    );
};

export default AppRouter;  // Экспортируем компонент AppRouter по умолчанию
