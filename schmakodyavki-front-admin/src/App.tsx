import React, {useEffect} from 'react';  // Импортируем React и useEffect для работы с жизненным циклом компонента
import Header from "./components/Header";  // Импортируем компонент Header для отображения вверху страницы
import Footer from "./components/Footer";  // Импортируем компонент Footer для отображения внизу страницы
import {useNavigate} from "react-router-dom";  // Импортируем BrowserRouter и useNavigate для работы с маршрутизацией
import AppRouter from "./approuter/AppRouter";  // Импортируем компонент AppRouter для обработки маршрутов приложения

// Основной компонент приложения
function App() {
    const navigate = useNavigate();  // Хук для навигации между страницами

    // Используем useEffect для выполнения проверки токена при загрузке компонента
    useEffect(() => {
        const validateToken = async () => {
            // Получаем токен из localStorage
            const token = localStorage.getItem('token');

            // Если токена нет, перенаправляем пользователя на страницу входа
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                // Отправляем запрос на сервер для проверки действительности токена
                const response = await fetch('http://localhost:5000/admin/validate-token', {
                    method: 'GET',  // Используем метод GET
                    headers: {
                        'Authorization': `Bearer ${token}`,  // Передаем токен в заголовке запроса
                    },
                });

                // Если ответ не успешный, выбрасываем ошибку
                if (!response.ok) {
                    throw new Error("Token is invalid");
                }

                // Преобразуем ответ в JSON
                const data = await response.json();
                // Если токен недействителен, выбрасываем ошибку
                if (!data.valid) {
                    throw new Error("Token is invalid");
                }
            } catch (error) {
                // В случае ошибки (например, токен недействителен или запрос не удался)
                console.error("Token validation error:", error);
                localStorage.removeItem('token');  // Удаляем токен из localStorage
                navigate('/login');  // Перенаправляем пользователя на страницу входа
            }
        };

        // Вызываем функцию проверки токена при монтировании компонента
        validateToken();
    }, [navigate]);  // Зависимость от navigate, чтобы при его изменении выполнялся повторный вызов useEffect

    return (
        <div>
            <Header/>  {/* Отображаем компонент Header */}

            <main className="relative top-[46px] pb-8 flex justify-center">  {/* Основной контент страницы */}
                <AppRouter/>  {/* Рендерим маршруты из компонента AppRouter */}
            </main>

            <Footer/>  {/* Отображаем компонент Footer */}
        </div>
    );
}

export default App;  // Экспортируем компонент App как основной компонент приложения
