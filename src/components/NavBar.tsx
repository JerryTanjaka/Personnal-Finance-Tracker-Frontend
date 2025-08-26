import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
    const [isExpanded, setIsExpanded] = useState(false);

    const textAnimation = (extraClasses = "") =>
        `transition-all duration-300 delay-150 transform ${isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
        } ${extraClasses}`;

    return (
        <nav
            className={`sticky left-0 top-6 m-6 mr-0 flex h-[94vh] flex-col justify-between rounded-lg bg-gray-100 p-6 transition-all duration-300 ${isExpanded ? "w-64" : "w-20"
                }`}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            <div className="flex flex-col items-center gap-3">
                <i className="bxr bx-user rounded-full border-4 border-b-blue-600 p-2 text-3xl"></i>
                <span className={textAnimation("text-xl font-medium text-gray-800")}>
                    User
                </span>
            </div>

            <div className="flex flex-col gap-4 font-medium text-gray-700">
                <Link to={"/dashboard"}>
                    <div className="flex cursor-pointer items-center space-x-2 hover:text-blue-600">
                        <i className="bxr bx-pie-chart-alt text-2xl"></i>
                        <span className={textAnimation()}>DashBoard</span>
                    </div>
                </Link>

                <div className="flex cursor-pointer items-center space-x-2 hover:text-green-600">
                    <i className='bxr text-2xl bx-wallet-note'  ></i>
                    <span className={textAnimation()}>Income</span>
                </div>

                <Link to={"/expense"}>
                    <div className="flex cursor-pointer items-center space-x-2 hover:text-indigo-600">
                        <i className='bxr text-2xl bx-dollar-circle'  ></i>
                        <span className={textAnimation()}>Expenses</span>
                    </div>
                </Link>

                <Link to={'/categories'}>
                    <div className="flex cursor-pointer items-center space-x-2 hover:text-blue-600 text-nowrap">
                        <i className='bxr bx-folder text-2xl'></i>
                        <span className={textAnimation()}>Category</span>
                    </div>
                </Link>

                <div className="my-6 w-full border border-b-gray-300"></div>

                <Link to={"/settings"}>
                    <div className="flex cursor-pointer items-center space-x-2 hover:text-slate-600">
                        <i className="bxr bx-cog text-2xl"></i>
                        <span className={textAnimation()}>Settings</span>
                    </div>
                </Link>

                <Link to={"/support"}>
                    <div className="flex cursor-pointer items-center space-x-2 hover:text-sky-600">
                        <i className="bxr bx-message-question-mark text-2xl"></i>
                        <span className={textAnimation()}>Support</span>
                    </div>
                </Link>
            </div>

            <Link to={"/login"}>
                <div className="flex cursor-pointer items-center space-x-2 text-gray-700 hover:text-red-600">
                    <i className="bxr bx-arrow-out-left-square-half text-2xl"></i>
                    <span className={textAnimation("text-xl font-medium")}>Logout</span>
                </div>
            </Link>
        </nav>
    );
}
