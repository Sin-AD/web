import { useLocation } from "react-router-dom";  // Импортируем хук useLocation для получения текущего пути

// Хук useLastPathElement возвращает последний элемент из текущего URL-пути
export const useLastPathElement = () => {
    const locate = useLocation();  // Получаем объект текущего местоположения (URL) с помощью хука useLocation
    const spiltLocate = locate.pathname.split('/');  // Разбиваем путь на части, используя слэш ('/') в качестве разделителя
    // Возвращаем последний элемент пути, декодируя его из URL-кодировки
    return decodeURIComponent(spiltLocate[spiltLocate.length - 1]);
};
