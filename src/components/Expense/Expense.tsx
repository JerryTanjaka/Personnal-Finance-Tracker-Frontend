import { FaSearch } from 'react-icons/fa';
import ExpenseCard from './ExpenseCard.tsx';

export default function Expense() {
    
    const sampleExpenses = [
        {
            id: 1,
            name: 'Groceries',
            amount: 45.6,
            date: '2025-08-25',
            category: 'Food',
        },
        {
            id: 2,
            name: 'Netflix',
            amount: 12.99,
            date: '2025-08-23',
            category: 'Entertainment',
        },
        {
            id: 3,
            name: 'Taxi',
            amount: 8.5,
            date: '2025-08-22',
            category: 'Transport',
        },
        {
            id: 4,
            name: 'Electricity Bill',
            amount: 60.0,
            date: '2025-08-20',
            category: 'Utilities',
        },
        {
            id: 5,
            name: 'Coffee',
            amount: 4.5,
            date: '2025-08-21',
            category: 'Food',
        },
        {
            id: 5,
            name: 'Coffsee',
            amount: 4.5,
            date: '2025-08-21',
            category: 'Fsqsood',
        },
    ];

    return (
        <div className="z-50 flex min-h-screen w-full flex-col items-center justify-center bg-gray-200 p-4">
            <div className="mx-auto flex h-full w-full max-w-7xl flex-col rounded-2xl bg-white p-6 shadow-[0px_0px_7px_4px_rgba(0,0,0,0.2)]">
                <div className="flex flex-col border-b-2 pb-4 md:flex-row md:items-center md:justify-between">
                    <h1 className="mb-4 text-3xl font-bold md:mb-0">
                        Expense Tracker
                    </h1>
                    <div className="flex flex-col items-start space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-4">
                        <div className="relative flex items-center">
                            <FaSearch className="pointer-events-none absolute left-3 text-xl text-gray-800" />
                            <input
                                type="text"
                                className="h-11 w-60 rounded-lg border-none bg-gray-200 pl-10 text-xl text-gray-800 placeholder-gray-800/70 outline-none"
                                placeholder="Search"
                            />
                        </div>
                        <button className="h-11 w-60 rounded bg-emerald-600 px-3 py-1 text-xl text-white shadow-md transition duration-100 ease-in-out hover:bg-emerald-500 active:scale-95">
                            New Expense
                        </button>
                    </div>
                </div>

                <div className="mt-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {sampleExpenses.map((expense) => (
                        <ExpenseCard key={expense.id} expense={expense} />
                    ))}
                </div>
            </div>
        </div>
    );
}
