import { useLocation } from "react-router-dom";

// Кастомный хук для получения последнего элемента в пути URL
export const useLastPathElement = () => {
    // Получаем текущий объект местоположения (location) из маршрутизатора
    const locate = useLocation();

    // Разбиваем путь (pathname) на части, используя символ "/" как разделитель
    const spiltLocate = locate.pathname.split('/');

    // Возвращаем последний элемент пути, декодируя его (например, если в пути есть URL-кодированные символы)
    return decodeURIComponent(spiltLocate[spiltLocate.length - 1]);
}
