import HelpPage from "./pages/HelpPage";
import StartPage from "./pages/StartPage";
import AccountPage from "./pages/AccountPage";
import SchedulePage from "./pages/SchedulePage";
import CalendarPage from "./pages/CalendarPage";

export const pagesForMenus =  {
    pages:
        [
            {path: '/', buttonText: 'Главная', isDataConfirmed: false,  component: StartPage, icon: 'home'},
            {path: '/help', buttonText: 'Помощь', isDataConfirmed: false, component: HelpPage, icon: 'live_help'},
            {path: '/account', buttonText: 'Аккаунт', isDataConfirmed: true, component: AccountPage, icon: 'person'},
            {path: '/schedule', buttonText: 'Расписание', isDataConfirmed: true, component: SchedulePage, icon: 'event'},
            {path: '/calendar', buttonText: 'Календарь', isDataConfirmed: true, component: CalendarPage, icon: 'view_module'},
        ]
};
