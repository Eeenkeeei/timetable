import HelpPage from "./HelpPage";
import StartPage from "./StartPage";
import AccountPage from "./AccountPage";
import SchedulePage from "./SchedulePage";

export const pagesForMenus =  {
    pages:
        [
            {path: '/', buttonText: 'Главная', isDataConfirmed: false,  component: StartPage, icon: 'home'},
            {path: '/help', buttonText: 'Помощь', isDataConfirmed: false, component: HelpPage, icon: 'live_help'},
            {path: '/account', buttonText: 'Аккаунт', isDataConfirmed: true, component: AccountPage, icon: 'person'},
            {path: '/schedule', buttonText: 'Расписание', isDataConfirmed: true, component: SchedulePage, icon: 'event'},
        ]
};
