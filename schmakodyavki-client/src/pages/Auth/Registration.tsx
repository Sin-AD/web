import React, { useState } from 'react';  // Импорт React и хука useState для управления состоянием
import { Link, useNavigate } from 'react-router-dom';  // Импорт Link для переходов и useNavigate для навигации

// Компонент Registration
const Registration: React.FC = () => {
    // Состояния для username, password, confirmPassword, errorMessage, loading
    const [username, setEmail] = useState('');  // Состояние для имени пользователя
    const [password, setPassword] = useState('');  // Состояние для пароля
    const [confirmPassword, setConfirmPassword] = useState('');  // Состояние для подтверждения пароля
    const [errorMessage, setErrorMessage] = useState<string | null>(null);  // Состояние для отображения ошибки
    const [loading, setLoading] = useState(false);  // Состояние для отслеживания загрузки
    const navigate = useNavigate();  // Хук для навигации в приложении

    // Обработчик отправки формы
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();  // Останавливаем стандартное поведение формы

        setLoading(true);  // Включаем состояние загрузки
        setErrorMessage(null);  // Очищаем предыдущее сообщение об ошибке

        // Проверка, что пароли совпадают
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");  // Выводим ошибку, если пароли не совпадают
            setLoading(false);  // Отключаем загрузку
            return;
        }

        try {
            // Отправляем запрос на сервер для регистрации
            const response = await fetch('http://localhost:5000/auth/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),  // Отправляем username и password на сервер
            });

            if (!response.ok) {  // Если ответ от сервера не успешный
                const data = await response.json();  // Получаем данные ошибки
                setErrorMessage(data.message || 'Registration failed');  // Отображаем ошибку
            } else {
                const data = await response.json();  // Получаем данные успешного ответа
                console.log('Registration successful:', data);  // Логируем успешную регистрацию
                navigate('/login');  // Переходим на страницу логина
            }
        } catch (error) {
            setErrorMessage('An error occurred during registration');  // Если произошла ошибка, отображаем сообщение
            console.error(error);  // Логируем ошибку
        } finally {
            setLoading(false);  // Отключаем состояние загрузки
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-100">
            {/* Основной контейнер для формы регистрации */}
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>
                {/* Если есть ошибка, отображаем сообщение */}
                {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Поле для ввода username */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
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
                            onChange={(e) => setPassword(e.target.value)}  // Обновляем состояние пароля
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    {/* Поле для ввода подтверждения пароля */}
                    <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}  // Обновляем состояние confirmPassword
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
                            {loading ? 'Registering...' : 'Register'}  {/* Изменяем текст в зависимости от состояния */}
                        </button>
                    </div>
                    {/* Ссылка на страницу логина */}
                    <div className="text-Diesel text-[14px] text-center underline">
                        <Link to="/login">
                            to login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registration;  // Экспортируем компонент Registration
