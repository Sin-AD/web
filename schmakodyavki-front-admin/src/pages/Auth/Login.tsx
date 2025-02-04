// Импортируем необходимые библиотеки и хуки
import React, { useEffect, useState } from 'react'; // Используем React и хуки для состояния и эффектов
import { Link, useNavigate } from 'react-router-dom'; // Используем Link для навигации и useNavigate для программной навигации

// Компонент Login
const Login: React.FC = () => {
    // Состояния для хранения данных формы
    const [username, setEmail] = useState(''); // Состояние для хранения email (на самом деле это username)
    const [password, setPassword] = useState(''); // Состояние для пароля
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // Состояние для сообщения об ошибке
    const [loading, setLoading] = useState(false); // Состояние для отображения загрузки
    const navigate = useNavigate(); // Хук для навигации

    // useEffect, который срабатывает при монтировании компонента
    useEffect(() => {
        // Получаем параметры из URL
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token'); // Токен
        const name = urlParams.get('name'); // Имя пользователя

        // Если токен и имя найдены в URL, сохраняем их в localStorage и редиректим на страницу Home
        if (token && name) {
            localStorage.setItem('token', token); // Сохраняем токен
            localStorage.setItem('username', name); // Сохраняем имя пользователя

            navigate('/Home'); // Переход на страницу Home
        } else {
            console.error('No token or username found in URL'); // Логирование ошибки, если токен или имя не найдены
        }
    }, [navigate]); // Запускается при изменении navigate

    // Обработчик отправки формы (вход)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы

        setLoading(true); // Включаем состояние загрузки
        setErrorMessage(null); // Очищаем старое сообщение об ошибке

        try {
            // Отправляем запрос на сервер для авторизации
            const response = await fetch('http://localhost:5000/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Указываем тип данных в запросе
                },
                body: JSON.stringify({ username, password }), // Отправляем username и password как тело запроса
            });

            if (!response.ok) {
                const data = await response.json(); // Получаем данные в случае ошибки
                setErrorMessage(data.message || 'Login failed'); // Отображаем сообщение об ошибке
            } else {
                const data = await response.json(); // Получаем данные при успешном ответе

                if (data.token) {
                    localStorage.setItem('token', data.token); // Сохраняем токен в localStorage
                    console.log('Token saved:', data.token); // Логируем сохранение токена
                }

                console.log('Login successful:', data); // Логируем успешный вход
                navigate('/Home'); // Переход на страницу Home после успешного входа
            }
        } catch (error) {
            setErrorMessage('An error occurred during login'); // Если произошла ошибка при запросе
            console.error(error); // Логируем ошибку
        } finally {
            setLoading(false); // Включаем флаг окончания загрузки
        }
    };

    // Обработчик входа через GitHub
    const handleGitHubLogin = () => {
        // Перенаправляем пользователя на страницу авторизации через GitHub
        window.location.href = 'http://localhost:5000/admin/github';
    };

    return (
        // Основной контейнер для формы
        <div className="flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
                {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>} {/* Отображаем сообщение об ошибке, если оно есть */}

                {/* Форма входа */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email {/* Метка для поля ввода email */}
                        </label>
                        <input
                            type="username"
                            id="username"
                            value={username}
                            onChange={(e) => setEmail(e.target.value) /*Срабатывает при изменение*/}
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" // Классы для стилей
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password {/* Метка для поля ввода пароля */}
                        </label>
                        <input
                            type="password" // Поле для пароля
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-PaleTaupe rounded-md hover:bg-Diesel duration-200"
                            disabled={loading} // Отключаем кнопку, пока идет процесс входа
                        >
                            {loading ? 'Logining...' : 'Login'} {/* Меняем текст на кнопке в зависимости от состояния загрузки */}
                        </button>
                    </div>
                </form>

                {/* Кнопка для входа через GitHub */}
                <div className="text-center">
                    <button
                        onClick={handleGitHubLogin} // Обработчик нажатия на кнопку
                        className="w-full px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-900 duration-200"
                    >
                        Login with GitHub
                    </button>
                </div>
            </div>
        </div>
    );
};

// Экспортируем компонент для использования в других частях приложения
export default Login;
