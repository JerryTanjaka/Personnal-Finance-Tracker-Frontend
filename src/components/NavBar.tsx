import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { useTranslation } from 'react-i18next';
// ...existing code...

export default function NavBar() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [username] = useLocalStorage('username', 'User');
    const { t } = useTranslation();


    const textAnimation = (extraClasses = '') =>
        `transition-all duration-300 delay-150 transform ${isExpanded
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 -translate-x-2'
        } ${extraClasses}`;

    return (
        <nav
            className={`sticky top-6 left-0 m-6 mr-0 flex h-[94vh] flex-col justify-between rounded-lg bg-gray-100 p-6 shadow-md transition-all duration-300 ${isExpanded ? 'w-64' : 'w-20'
                }`}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            <div className="flex flex-col items-center gap-3">
                <i className="bxr bx-user rounded-full border-4 border-b-blue-600 p-2 text-3xl"></i>
                <span
                    className={textAnimation(
                        'text-xl font-medium text-gray-800',
                    )}
                >
                    {username}
                </span>
            </div>

            <div className="flex flex-col gap-4 font-medium text-gray-700">
                <NavLink to={'/dashboard'} end className={({ isActive }) => `flex cursor-pointer  text-nowrap items-center space-x-2 ${isActive ? 'text-blue-600' : 'hover:text-blue-600'}`}>
                    <i className="bxr bx-pie-chart-alt text-2xl"></i>
                    <span className={textAnimation()}>{t("dashboard")}</span>
                </NavLink>
                <NavLink to={'/incomes'} className={({ isActive }) => `flex cursor-pointer items-center space-x-2 ${isActive ? 'text-green-600' : 'hover:text-green-600'}`}>
                    <i className="bxr bx-wallet-note text-2xl"></i>
                    <span className={textAnimation()}>{t("incomes")}</span>
                </NavLink>
                <NavLink to={'/expenses'} className={({ isActive }) => `flex cursor-pointer items-center space-x-2 ${isActive ? 'text-indigo-600' : 'hover:text-indigo-600'}`}>
                    <i className="bxr bx-dollar-circle text-2xl"></i>
                    <span className={textAnimation()}>{t("expenses")}</span>
                </NavLink>

                <NavLink to={'/categories'} className={({ isActive }) => `flex cursor-pointer items-center space-x-2 text-nowrap ${isActive ? 'text-blue-600' : 'hover:text-blue-600'}`}>
                    <i className="bxr bx-folder text-2xl"></i>
                    <span className={textAnimation()}>{t("categories")}</span>
                </NavLink>

                <div className="my-6 w-full border border-b-gray-300"></div>

                <NavLink to={'/settings'} className={({ isActive }) => `flex cursor-pointer items-center space-x-2 ${isActive ? 'text-slate-600' : 'hover:text-slate-600'}`}>
                    <i className="bxr bx-cog text-2xl"></i>
                    <span className={textAnimation()}>{t("settings")}</span>
                </NavLink>

                <NavLink to={'/support'} className={({ isActive }) => `flex cursor-pointer items-center space-x-2 ${isActive ? 'text-sky-600' : 'hover:text-sky-600'}`}>
                    <i className="bxr bx-message-question-mark text-2xl"></i>
                    <span className={textAnimation()}>{t("support")}</span>
                </NavLink>
            </div>

        <NavLink to={'/login'} className={({ isActive }) => `flex cursor-pointer text-nowrap items-center space-x-2 ${isActive ? 'text-red-600' : 'text-gray-700 hover:text-red-600'}`}>
            <i className="bxr bx-arrow-out-left-square-half text-2xl"></i>

            <span onClick={() => localStorage.removeItem("accessToken")} className={textAnimation("text-xl font-medium")}>{t("logout")}</span>
        </NavLink>
        </nav>
    );
}
