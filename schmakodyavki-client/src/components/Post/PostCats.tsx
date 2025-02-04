import React from 'react';

// Интерфейс для описания типа пропсов компонента, который принимает список кошек
interface CatProps {
    cats: Cat[];  // Массив объектов кошек
}

// Интерфейс для описания типа кошки
interface Cat {
    name: string;  // Имя кошки
    breed: string;  // Порода кошки
    sex: string;  // Пол кошки
    age: number;  // Возраст кошки
    story: string;  // История кошки
    img: string;  // URL изображения кошки
}

// Компонент, который отображает список кошек
const PostCats: React.FC<CatProps> = ({ cats }) => {
    return (
        // Контейнер для списка кошек
        <div className="w-full h-auto bg-transparent flex flex-row text-gray-600 text-[14px]">
            {
                // Итерация по массиву кошек и отображение их имен
                cats.map((cat, index) => (
                    // Для каждой кошки создается параграф с ее именем
                    <p key={index}>{cat.name}</p>
                ))
            }
        </div>
    );
};

export default PostCats;
