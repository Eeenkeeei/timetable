import StartPage from "./StartPage";
import RegisterPage from "./RegisterPage";

export const pagesForMenus =  {
    pages:
        [
            {path: '/start', buttonText: 'Вход', isLogged: false, component: StartPage},
            {path: '/registration', buttonText: 'Регистрация', isLogged: false, component: RegisterPage},
            {path: '/help', buttonText: 'Помощь', isLogged: false, component: null}
        ]
};
