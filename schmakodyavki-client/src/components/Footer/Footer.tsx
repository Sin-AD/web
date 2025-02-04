import React from 'react';

// Компонент Footer — отображает нижний колонтитул на странице
export const Footer = () => {
    return (
        // Див, который фиксирован внизу страницы
        <div className="fixed bottom-0 w-full max-h-6 h-auto text-center bg-TuftBush border-t-[1px] border-BlackOlive">
            {/* Текст с названием компании и годами */}
            Schmakodyavki inc. 1699 - 2024
        </div>
    );
};
