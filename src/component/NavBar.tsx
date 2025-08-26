import { useState } from 'react';
import { Link } from "react-router-dom";

export default function NavBar() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <nav
            className={`sticky left-0 top-6 m-6 flex h-[94vh] flex-col justify-between rounded-lg bg-gray-100 p-6 z-50 shadow-[0px_0px_5px_5px_rgba(0,0,0,0.25)] transition-all duration-200 ${isExpanded ? 'w-64' : 'w-20'}`}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            <div className="flex flex-col items-center gap-3">
                <i className="bxr bx-user rounded-full border-4 border-b-blue-600 p-2 text-3xl"></i>
                {isExpanded && (
                    <span className="text-xl font-medium text-gray-800">User</span>
                )}
            </div>
            <div className="flex flex-col gap-4 font-medium text-gray-700">
                <Link to={'/dashboard'}>
                    <div className="flex cursor-pointer items-center space-x-2 hover:text-blue-600 text-nowrap">
                        <i className="bxr bx-pie-chart-alt text-2xl"></i>
                        {isExpanded && <span>DashBoard</span>}
                    </div>
                </Link>
                <Link to={'/categories'}>
                    <div className="flex cursor-pointer items-center space-x-2 hover:text-blue-600 text-nowrap">
                        <i className='bxr bx-folder text-2xl'></i>
                        {isExpanded && <span>Category</span>}
                    </div>
                </Link>
                <div className="flex cursor-pointer items-center space-x-2 hover:text-green-600 text-nowrap">
                    <i className="bxr bx-list-ul-square text-2xl"></i>
                    {isExpanded && <span>Spending History</span>}
                </div>
                <div className="flex cursor-pointer items-center space-x-2 hover:text-indigo-600 text-nowrap">
                    <i className="bxr bx-repeat-alt text-2xl"></i>
                    {isExpanded && <span>Reccuring Expenses</span>}
                </div>
                <div className="my-6 w-full border border-b-gray-300"></div>
                <div className="flex cursor-pointer items-center space-x-2 hover:text-slate-600 text-nowrap">
                    <i className="bxr bx-cog text-2xl"></i>
                    {isExpanded && <span>Settings</span>}
                </div>
                <div className="flex cursor-pointer items-center space-x-2 hover:text-sky-600 text-nowrap">
                    <i className="bxr bx-message-question-mark text-2xl"></i>
                    {isExpanded && <span>Support</span>}
                </div>
            </div>
            <div className="flex cursor-pointer items-center space-x-2 text-gray-700 hover:text-red-600 text-nowrap">
                <i className="bxr bx-arrow-out-left-square-half text-2xl"></i>
                {isExpanded && <span className="text-xl font-medium">Logout</span>}
            </div>
        </nav>
    );
}