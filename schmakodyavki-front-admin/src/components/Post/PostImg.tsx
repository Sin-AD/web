import React from 'react';  // Импортируем React для использования функциональных компонентов

// Описание типа данных для свойств компонента
interface ImgProp {
    img: string;  // Свойство img - строка, которая будет содержать URL изображения
}

// Функциональный компонент PostImg, который принимает свойство img (URL изображения)
const PostImg: React.FC<ImgProp> = ({ img }) => {
    return (
        <div>
            {/* Рендерим изображение с переданным URL */}
            <img
                src={img}  // Устанавливаем источник изображения с помощью переданного свойства img
                alt="post"  // Указываем альтернативный текст для изображения
                className="w-full h-full border-b-2 rounded-b-xl"  // Добавляем стили для изображения
                width="800px"  // Устанавливаем фиксированную ширину изображения
                height="800px"  // Устанавливаем фиксированную высоту изображения
            />
        </div>
    );
};

export default PostImg;  // Экспортируем компонент для использования в других частях приложения
