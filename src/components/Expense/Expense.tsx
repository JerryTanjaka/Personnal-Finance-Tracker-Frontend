import { useState } from 'react';
import { FaList, FaSearch, FaThLarge } from 'react-icons/fa';
import ExpenseCard from './ExpenseCard.tsx';

export default function Expense() {
    const [view, setView] = useState<'grid' | 'list'>(() => {
        return (
            (localStorage.getItem('expenseView') as 'grid' | 'list') || 'grid'
        );
    });

    const toggleView = () => {
        const newView = view === 'grid' ? 'list' : 'grid';
        setView(newView);
        localStorage.setItem('expenseView', newView);
    };

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
            id: 6,
            name: 'Coffsee',
            amount: 4.5,
            date: '2025-08-21',
            category: 'Fsqsood',
        },
    ];

    return (
        <div className="z-50 flex h-[100%] w-full flex-col items-center bg-gray-200 p-4">
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

                        <div className="flex space-x-2">
                            <button className="h-11 rounded bg-emerald-600 px-3 py-1 text-xl text-white shadow-md transition hover:bg-emerald-500 active:scale-95">
                                New Expense
                            </button>

                            <button
                                onClick={toggleView}
                                className="flex h-11 w-11 items-center justify-center rounded bg-gray-200 text-gray-800 shadow-md transition hover:bg-gray-300 active:scale-95"
                            >
                                {view === 'grid' ? <FaList /> : <FaThLarge />}
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={`mt-6 w-full overflow-y-auto pt-4 pr-2 ${
                        view === 'grid'
                            ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'
                            : 'flex flex-col space-y-4'
                    }`}
                    style={{ maxHeight: 'calc(100vh - 220px)' }}
                >
                    {sampleExpenses.map((expense) => (
                        <ExpenseCard
                            key={expense.id}
                            expense={expense}
                            view={view}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
