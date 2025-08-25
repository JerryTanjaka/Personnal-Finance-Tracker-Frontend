import React from 'react';
import { FaBolt, FaCoffee, FaFilm, FaTaxi, FaUtensils } from 'react-icons/fa';

type ExpenseCardProps = {
    expense: { name: string; amount: number; date: string; category: string };
};

export default function ExpenseCard({ expense }: ExpenseCardProps) {
    const categoryIcons: Record<string, React.ReactNode> = {
        Food: <FaUtensils className="text-white" />,
        Entertainment: <FaFilm className="text-white" />,
        Transport: <FaTaxi className="text-white" />,
        Utilities: <FaBolt className="text-white" />,
        Coffee: <FaCoffee className="text-white" />,
    };

    const categoryColors: Record<string, string> = {
        Food: 'bg-red-500',
        Entertainment: 'bg-purple-500',
        Transport: 'bg-green-500',
        Utilities: 'bg-yellow-500',
        Coffee: 'bg-orange-500',
    };

    const formattedDate = new Date(expense.date).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });

    return (
        <div className="group relative rounded-xl border border-gray-200 bg-white p-4 shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-xl">
            <div
                className={`absolute -top-3 left-3 flex h-10 w-10 items-center justify-center rounded-full ${
                    categoryColors[expense.category] || 'bg-gray-400'
                }`}
            >
                {categoryIcons[expense.category] || (
                    <FaUtensils className="text-white" />
                )}
            </div>

            <div className="ml-12">
                <h2 className="text-lg font-semibold text-gray-800">
                    {expense.name}
                </h2>
                <p className="mt-1 text-sm text-gray-500">{expense.category}</p>
                <p className="mt-2 text-xl font-bold text-gray-900">
                    ${expense.amount.toFixed(2)}
                </p>
                <p className="mt-1 text-sm text-gray-400">{formattedDate}</p>
            </div>
        </div>
    );
}
