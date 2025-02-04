import Home from '../pages/Home';
import Breeds from '../pages/Breeds';
import Breed from '../pages/Breed';
import Error from '../pages/Error';
import Profile from '../pages/Profile';
import Login from '../pages/Auth/Login';
import Registration from '../pages/Auth/Registration';
import Community from "../pages/Community";
import AllCats from "../pages/Cats";

const publicRout = [
    {path: "/login", component: <Login/>, exact: true},
    {path: "/registration", component: <Registration/>, exact: true},
    {path: "*", component: <Error/>, exact: true},
];

const privateRout = [
    {path: "/AllKitty", component: <AllCats />, exact: true},
    {path: "/Community", component: <Community/>, exact: true},

    {path: "/Breeds", component: <Breeds/>, exact: true},
    {path: "/Breeds/:breed", component: <Breed/>, exact: true},

    {path: "/profile", component: <Profile/>, exact: true},
    {path: "/Home", component: <Home/>, exact: true},
    {path: "/", component: <Home/>, exact: true},
];

export {publicRout, privateRout};
