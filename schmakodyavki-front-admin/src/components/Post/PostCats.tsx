import React from 'react';  // Импортируем React для использования функциональных компонентов

// Описание типа данных для свойств компонента
interface CatProps {
    cats: Cat[];  // cats - массив объектов типа Cat
}

// Описание типа данных для объекта Cat
interface Cat {
    name: string;  // Имя кота
    breed: string;  // Порода кота
    sex: string;  // Пол кота
    age: number;  // Возраст кота
    story: string;  // История кота
    img: string;  // Ссылка на изображение кота
}

// Функциональный компонент PostCats, который принимает свойство cats (массив котов)
const PostCats: React.FC<CatProps> = ({ cats }) => {
    return (
        <div className="w-full h-auto bg-transparent flex flex-row text-gray-600 text-[14px]">
            {/* Перебираем массив cats и выводим имя каждого кота */}
            {
                cats.map((cat, index) => (
                    <p key={index}>{cat.name}</p>  // Для каждого кота выводим его имя в <p>
                ))
            }
        </div>
    );
};

export default PostCats;  // Экспортируем компонент для использования в других частях приложения
