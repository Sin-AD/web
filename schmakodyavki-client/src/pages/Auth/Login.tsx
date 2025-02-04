import React, { useEffect, useState } from 'react';  // Импорт React и хука useState, useEffect для управления состоянием и побочными эффектами
import { Link, useNavigate } from 'react-router-dom';  // Импорт хука useNavigate для навигации и компонента Link для переходов

// Компонент Login
const Login: React.FC = () => {
    // Состояния для username, password, errorMessage, loading
    const [username, setEmail] = useState('');  // Состояние для имени пользователя
    const [password, setPassword] = useState('');  // Состояние для пароля
    const [errorMessage, setErrorMessage] = useState<string | null>(null);  // Состояние для отображения ошибки
    const [loading, setLoading] = useState(false);  // Состояние для отображения загрузки (кнопка "Login" заблокирована)
    const navigate = useNavigate();  // Хук для навигации в приложении

    // useEffect срабатывает при монтировании компонента
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);  // Получаем параметры URL
        const token = urlParams.get('token');  // Извлекаем token из URL
        const name = urlParams.get('name');  // Извлекаем name из URL

        if (token && name) {  // Если в URL есть token и name
            localStorage.setItem('token', token);  // Сохраняем token в localStorage
            localStorage.setItem('username', name);  // Сохраняем username в localStorage
            navigate('/Home');  // Переходим на страницу /Home
        } else {
            console.error('No token or username found in URL');  // Выводим ошибку, если параметры отсутствуют
        }
    }, [navigate]);  // Зависимость от navigate, чтобы перезапустить эффект при изменении navigate

    // Обработчик отправки формы
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();  // Останавливаем стандартное поведение формы

        setLoading(true);  // Включаем состояние загрузки
        setErrorMessage(null);  // Очищаем сообщение об ошибке

        try {
            // Отправляем запрос на сервер для авторизации
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),  // Отправляем username и password
            });

            if (!response.ok) {  // Если ответ от сервера не успешный
                const data = await response.json();  // Получаем данные ошибки
                setErrorMessage(data.message || 'Login failed');  // Отображаем ошибку
            } else {
                const data = await response.json();  // Получаем данные успешного ответа

                if (data.token) {  // Если сервер возвращает token
                    localStorage.setItem('token', data.token);  // Сохраняем token в localStorage
                    console.log('Token saved:', data.token);  // Логируем token
                }

                console.log('Login successful:', data);  // Логируем успешный вход
                navigate('/Home');  // Переходим на страницу /Home
            }
        } catch (error) {
            setErrorMessage('An error occurred during login');  // Если ошибка в запросе, выводим сообщение
            console.error(error);  // Логируем ошибку
        } finally {
            setLoading(false);  // Отключаем состояние загрузки
        }
    };

    // Обработчик входа через GitHub
    const handleGithubLogin = () => {
        // Переходим по ссылке для авторизации через GitHub
        window.location.href = 'https://github.com/login/oauth/authorize?client_id=Iv23li1FNTXMJTeUzwRB';
    };

    return (
        <div className="flex items-center justify-center bg-gray-100">
            {/* Основной контейнер для формы входа */}
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
                {/* Если есть ошибка, отображаем сообщение */}
                {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Поле для ввода username */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="username"
                            id="username"
                            value={username}
                            onChange={(e) => setEmail(e.target.value)}  // Обновляем состояние username
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    {/* Поле для ввода пароля */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}  // Обновляем состояние password
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    {/* Кнопка для отправки формы */}
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-PaleTaupe rounded-md hover:bg-Diesel duration-200"
                            disabled={loading}  // Отключаем кнопку, если идет загрузка
                        >
                            {loading ? 'Logining...' : 'Login'}  {/* Изменяем текст в зависимости от состояния */}
                        </button>
                    </div>
                    {/* Кнопка для входа через GitHub */}
                    <div className="text-center">
                        <button
                            onClick={handleGithubLogin}
                            className="w-full px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-900 duration-200"
                        >
                            Login with GitHub
                        </button>
                    </div>
                    {/* Ссылка на страницу регистрации */}
                    <div className="text-Diesel text-[14px] text-center underline">
                        <Link to="/registration">
                            to registration
                        </Link>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default Login;  // Экспортируем компонент Login
