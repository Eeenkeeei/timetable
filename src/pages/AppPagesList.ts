import HelpPage from "./HelpPage";
import StartPage from "./StartPage";
import StartPageWithData from "./StartPageWithData";

export const pagesForMenus =  {
    pages:
        [
            {path: '/', buttonText: 'Главная', isLogged: false, component: StartPage},
            {path: '/help', buttonText: 'Помощь', isLogged: false, component: HelpPage},
        ]
};
