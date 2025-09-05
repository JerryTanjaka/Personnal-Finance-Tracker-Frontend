import { useContext, useEffect, useState } from "react";
import { t } from "i18next";
import { getExpenses } from "../data/DataFetch.ts";
import LoadingSpinner from "./UI/LoadingSpinner.tsx";
import ErrorMessage from "./UI/ErrorMessage.tsx";
import { CurrencyContext } from "../context/CurrencyContext.tsx";
import { formatCurrency } from "../utils/currency.ts";

interface Expense {
    id: number;
    name: string;
    amount: number;
    date: string;
    description: string;
    category_fk: {
        name: string;
    }
}

export default function ExpenseList() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { currency } = useContext(CurrencyContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const expensesData = await getExpenses();
                const sortedExpenses = expensesData.sort((a: Expense, b: Expense) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setExpenses(sortedExpenses.slice(0, 5));
            } catch (err) {
                setError('Failed to fetch expenses.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorMessage message={error} onClose={() => setError(null)} />;
    }

    return (
        <div className="w-full mx-auto p-4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Category
                            </th>
                            <th scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {expenses.map((expense) => (
                            <tr key={expense.id} className="hover:bg-gray-100">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{expense.description || t('no description')}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.category_fk?.name || t("uncategorized")}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(expense.amount, currency)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}