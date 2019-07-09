import HelpPage from "./HelpPage";
import StartPage from "./StartPage";
import AccountPage from "./AccountPage";

export const pagesForMenus =  {
    pages:
        [
            {path: '/', buttonText: 'Главная', isDataConfirmed: false,  component: StartPage},
            {path: '/help', buttonText: 'Помощь', isDataConfirmed: false, component: HelpPage},
            {path: '/account', buttonText: 'Аккаунт', isDataConfirmed: true, component: AccountPage},
        ]
};
