import HelpPage from "./HelpPage";
import StartPage from "./StartPage";
import AccountPage from "./AccountPage";

export const pagesForMenus =  {
    pages:
        [
            {path: '/React-timetable/', buttonText: 'Главная', isDataConfirmed: false,  component: StartPage, icon: 'home'},
            {path: '/React-timetable/help', buttonText: 'Помощь', isDataConfirmed: false, component: HelpPage, icon: 'live_help'},
            {path: '/React-timetable/account', buttonText: 'Аккаунт', isDataConfirmed: true, component: AccountPage, icon: 'person'},
        ]
};
