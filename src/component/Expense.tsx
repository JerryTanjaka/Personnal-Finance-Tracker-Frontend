// import { FaSearch } from "react-icons/fa";

export default function Expense() {
    return (
        <div className="z-50 flex w-full flex-col justify-center items-center bg-gray-200">
            <div className="mx-auto flex h-[93%] w-[93%] rounded-2xl bg-white p-6 shadow-[0px_0px_7px_4px_rgba(0,0,0,0.2)]">
                <div className="flex w-full justify-between  py-2">
                    <h1 className="text-3xl">Expense Tracker</h1>
                    <div className="flex space-x-4">
                        <div>
                            {/* <FaSearch className="cursor-pointer text-xl text-white" /> */}
                            <input
                                type="text"
                                className="h-11 w-60 rounded-lg border-none bg-gray-200 pl-3 text-gray-800 placeholder-gray-800/70 outline-none text-xl"
                                placeholder="Search"
                            />
                        </div>
                        <button className="h-11 w-60 text-xl transform rounded bg-sky-600 px-3 py-1 text-white shadow-md transition duration-100 ease-in-out hover:bg-sky-500 active:scale-95">
                            New Expense{' '}
                        </button>{' '}
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    );
}
