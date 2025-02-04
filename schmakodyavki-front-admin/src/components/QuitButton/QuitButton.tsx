import React from 'react';  // Импортируем React для использования функциональных компонентов

// Компонент QuitButton, который предоставляет кнопку выхода
export const QuitButton = () => {

    // Функция обработки клика по кнопке
    const handleClearStorage = () => {
        // Очищаем локальное хранилище
        localStorage.clear();
        // Перезагружаем страницу
        window.location.reload();
    };

    return (
        // Рендерим кнопку с заданными стилями и обработчиком события onClick
        <button
            onClick={handleClearStorage}  // Вызовем handleClearStorage при клике на кнопку
            className="w-full p-2 text-EIO rounded hover:bg-EIO hover:text-white hover:rounded-3xl transition duration-500 border-2 border-EIO font-bold text-[20px]"
        >
            Log out  {/* Текст кнопки */}
        </button>
    );
};
