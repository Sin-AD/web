import React from 'react';

// Компонент QuitButton - кнопка для выхода из аккаунта и очистки данных в localStorage
export const QuitButton = () => {
    // Функция для очистки данных в localStorage и перезагрузки страницы
    const handleClearStorage = () => {
        localStorage.clear();  // Очищаем все данные в localStorage
        window.location.reload();  // Перезагружаем страницу
    };

    return (
        <button
            onClick={handleClearStorage}  // Обработчик клика, который вызывает очистку данных и перезагрузку
            className="w-full p-2 text-black rounded hover:bg-PaleTaupe hover:text-white hover:rounded-3xl transition duration-500 border-2 border-Diesel font-bold text-[20px]"
        >
            Log out  {/* Текст на кнопке */}
        </button>
    );
};
