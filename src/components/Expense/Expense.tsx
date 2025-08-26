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
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

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
        <div className="z-50 flex h-[94vh] w-full flex-col items-center rounded-lg bg-gray-100">
            <div className="flex min-h-full w-full max-w-7xl flex-col rounded-2xl p-6">
                <div className="flex flex-col border-b-1 border-gray-300 pb-2 md:flex-row md:items-center md:justify-between text-3xl font-bold">
                    <h1 className="text-3xl font-bold">Expense Tracker</h1>

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
                            <button
                                onClick={openModal}
                                className="h-11 rounded bg-emerald-600 px-3 py-1 text-xl text-white shadow-md transition hover:bg-emerald-500 active:scale-95"
                            >
                                New Expense
                            </button>
                            <button
                                onClick={toggleView}
                                className="flex h-11 w-11 items-center justify-center rounded bg-gray-200 text-gray-800 border-[1px] border-gray-300 transition hover:bg-gray-300 active:scale-95"
                            >
                                {view === 'grid' ? <FaList /> : <FaThLarge />}
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={`mt-6 w-[100%] overflow-y-auto pt-3 pl-2 ${
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
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
                        <h2 className="text-2xl font-bold">Add New Expense</h2>
                        <form className="flex flex-col space-y-4">
                            <input
                                type="text"
                                placeholder="Name"
                                className="rounded border p-2"
                            />
                            <input
                                type="number"
                                placeholder="Amount"
                                className="rounded border p-2"
                            />
                            <input type="date" className="rounded border p-2" />
                            <select className="rounded border p-2">
                                <option>Food</option>
                                <option>Entertainment</option>
                                <option>Transport</option>
                                <option>Utilities</option>
                                <option>Coffee</option>
                            </select>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="rounded bg-gray-300 px-4 py-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded bg-emerald-600 px-4 py-2 text-white"
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
