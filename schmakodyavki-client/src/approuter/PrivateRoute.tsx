import React from 'react';
import { Navigate } from 'react-router-dom';

// Интерфейс для пропсов компонента PrivateRoute
interface PrivateRouteProps {
    component: React.FC;  // Ожидаем компонент, который будет отображен, если пользователь авторизован
}

// Компонент PrivateRoute, который защищает доступ к приватным маршрутам
const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component }) => {
    // Проверяем, есть ли токен в localStorage, чтобы определить, авторизован ли пользователь
    const isAuthenticated = !!localStorage.getItem('token');  // Преобразуем токен в булево значение (true, если токен есть)

    // Если пользователь авторизован, рендерим переданный компонент, иначе перенаправляем на страницу входа
    return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
