import React from 'react';  // Импортируем React для создания функциональных компонентов
import { Navigate } from 'react-router-dom';  // Импортируем Navigate для перенаправления пользователя на страницу входа, если не авторизован

// Определяем интерфейс для пропсов компонента PrivateRoute, который ожидает один пропс - компонент для рендера
interface PrivateRouteProps {
    component: React.FC;  // Пропс component является функциональным компонентом
}

// Основной компонент PrivateRoute, который проверяет авторизацию
const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component }) => {
    // Проверяем наличие токена в localStorage для определения, авторизован ли пользователь
    const isAuthenticated = !!localStorage.getItem('token');

    // Если пользователь авторизован (т.е. есть токен), рендерим переданный компонент
    // Если нет, перенаправляем пользователя на страницу входа
    return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;  // Экспортируем компонент PrivateRoute для использования в других частях приложения
