import React from 'react';
import {
    FaBolt,
    FaCoffee,
    FaExchangeAlt,
    FaFilm,
    FaTaxi,
    FaTrash,
    FaUtensils,
} from 'react-icons/fa';

type ExpenseCardProps = {
    expense: { name: string; amount: number; date: string; category: string };
    view: 'grid' | 'list';
};

export default function ExpenseCard({ expense, view }: ExpenseCardProps) {
    const categoryIcons: Record<string, React.ReactNode> = {
        Food: <FaUtensils className="text-white" />,
        Entertainment: <FaFilm className="text-white" />,
        Transport: <FaTaxi className="text-white" />,
        Utilities: <FaBolt className="text-white" />,
        Coffee: <FaCoffee className="text-white" />,
    };

    const categoryColors: Record<string, string> = {
        Food: 'bg-red-700',
        Entertainment: 'bg-purple-700',
        Transport: 'bg-green-700',
        Utilities: 'bg-yellow-700',
        Coffee: 'bg-orange-700',
    };

    const formattedDate = new Date(expense.date).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });

    return (
        <div
            className={`group relative rounded-xl border-[1px] border-b-1 border-gray-300 bg-gray-50 p-4 transition-transform duration-200 hover:scale-101 hover:shadow-sm ${
                view === 'list' ? 'h-20' : 'h-auto'
            }`}
        >
            <div
                className={`absolute -top-3 left-3 flex h-10 w-10 items-center justify-center rounded-full ${
                    categoryColors[expense.category] || 'bg-gray-400'
                }`}
            >
                {categoryIcons[expense.category] || (
                    <FaUtensils className="text-white" />
                )}
            </div>

            <div className="ml-12 flex justify-between">
                <div
                    className={
                        view === 'list' ? 'flex items-center space-x-10' : ''
                    }
                >
                    <h2 className="text-2xl font-semibold text-gray-800">
                        {expense.name}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        {expense.category}
                    </p>
                    <p className="mt-2 text-2xl font-bold text-red-700">
                        ${expense.amount.toFixed(2)}
                    </p>
                    <p className="mt-1 text-sm text-gray-400">
                        {formattedDate}
                    </p>
                </div>

                <div
                    className={`flex justify-around ${
                        view === 'grid'
                            ? 'flex-col space-y-2'
                            : 'flex-row space-x-5'
                    }`}
                >
                    <button
                        className={`flex transform items-center gap-2 rounded bg-gray-300 text-black  transition duration-100 ease-in-out hover:bg-gray-400 active:scale-95 ${view === 'grid' ? 'px-2 py-2 text-sm' : 'px-3 py-3 text-base'}`}
                    >
                        <FaExchangeAlt />
                        Change
                    </button>

                    <button
                        className={`flex transform items-center gap-2 rounded bg-neutral-950/90 text-white  transition duration-100 ease-in-out hover:bg-neutral-700 active:scale-95 ${view === 'grid' ? 'px-2 py-2 text-sm' : 'px-3 py-3 text-base'}`}
                    >
                        <FaTrash />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
