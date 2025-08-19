export default function NavBar() {
    return (
        <nav
            className="flex flex-col justify-between rounded-lg bg-gray-100 p-6  h-[94vh] w-fit m-6 shadow-[0px_0px_5px_5px_rgba(0,0,0,0.25)]">
            <div className="flex flex-col items-center gap-3">
                <i className='bxr  bx-user text-3xl rounded-full border-4 border-b-blue-600 p-2'></i>
                <span className='text-xl font-medium text-gray-800'>User</span>
            </div>
            <div className="flex flex-col gap-4 text-gray-700 font-medium">
                <div className="flex items-center space-x-2 hover:text-blue-600 cursor-pointer">
                    <i className='bxr  bx-pie-chart-alt text-2xl'></i>
                    <span>DashBoard</span>
                </div>
                <div className="flex items-center space-x-2 hover:text-green-600 cursor-pointer">
                    <i className='bxr  bx-list-ul-square text-2xl'></i>
                    <span>Spending History</span>
                </div>
                <div className="flex items-center space-x-2 hover:text-indigo-600 cursor-pointer">
                    <i className='bxr  bx-repeat-alt text-2xl'></i>
                    <span>Reccuring Expenses</span>
                </div>
                <div className="border-b-gray-300 border w-full my-6"></div>
                <div className="flex items-center space-x-2 hover:text-slate-600 cursor-pointer">
                    <i className='bxr  bx-cog text-2xl'></i>
                    <span>Settings</span>
                </div>
                <div className="flex items-center space-x-2 hover:text-sky-600 cursor-pointer">
                    <i className='bxr  bx-message-question-mark text-2xl'></i>
                    <span>Support</span>
                </div>
            </div>
            <div className="flex space-x-2  items-center hover:text-red-600 cursor-pointer text-gray-700">
                <i className='bxr  bx-arrow-out-left-square-half text-2xl'></i>
                <span className='text-xl font-medium'>Logout</span>
            </div>
        </nav>
    )
}