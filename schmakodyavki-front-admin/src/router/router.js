import Home from '../pages/Home';
import Breeds from '../pages/Breeds';
import Breed from '../pages/Breed';
import Error from '../pages/Error';
import Profile from '../pages/Profile';
import Login from '../pages/Auth/Login';
import AllCats from "../pages/Cats";
import Users from "../pages/Users/Users";

// Массив для публичных маршрутов (доступных без авторизации)
const publicRout = [
    { path: "/login", component: <Login />, exact: true },  // Страница входа
    { path: "*", component: <Error />, exact: true },      // Страница ошибки для всех несуществующих маршрутов
];

// Массив для приватных маршрутов (доступных только авторизованным пользователям)
const privateRout = [
    { path: "/AllKitty", component: <AllCats />, exact: true },  // Страница всех кошек
    { path: "/Breeds", component: <Breeds />, exact: true },      // Страница пород
    { path: "/Breeds/:breed", component: <Breed />, exact: true }, // Страница конкретной породы, параметр breed
    { path: "/Users", component: <Users />, exact: true },        // Страница пользователей
    { path: "/profile", component: <Profile />, exact: true },    // Страница профиля пользователя
    { path: "/Home", component: <Home />, exact: true },          // Главная страница
    { path: "/", component: <Home />, exact: true },              // Главная страница с корневого пути
];

export { publicRout, privateRout };
