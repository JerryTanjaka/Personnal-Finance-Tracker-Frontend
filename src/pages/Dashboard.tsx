import StatCard from '../components/StatCard.tsx';
import { PieChart } from "../components/PieChart.tsx";
import ExpenseList from "../components/ExpenseList.tsx";
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BarChart from '../components/BarChart.tsx';

type MonthlySummaryType = {
    year: number
    month: number
    totalIncome: number
    totalExpense: number
    netSavings: number
}

export default function Dashboard() {
    const token = localStorage.getItem('accessToken')

    const { t } = useTranslation();
    const [monthlySummary, setMonthlySummary] = useState<MonthlySummaryType | null>(null)
    const [balanceAlert, setBalaceAlert] = useState<{ alert: boolean, message: string } | null>(null)
    const [chartOptions, setChartOptions] = useState<any>({
        start: new Date(new Date().setFullYear(new Date().getFullYear(), 0, 1)),
        end: new Date(new Date().setFullYear(new Date().getFullYear() + 1, 0, 1)),
        category: undefined,
        type: undefined
    })
    const [categoryList, setCategoryList] = useState<any[]>([])

    function getMonthlySummary(month: string) {
        try {
            fetch(`${import.meta.env.VITE_API_URL}/api/summary/monthly?month=` + month,
                { headers: { Authorization: "Bearer " + token } }
            )
                .then(res => res.json())
                .then(res => setMonthlySummary(res))
                .catch(rej => console.log(rej.message))
        } catch (err: any) {
            console.log(err.message)
        }
    }

    function checkMonthBalance() {
        try {
            fetch(`${import.meta.env.VITE_API_URL}/api/summary/alerts`,
                { headers: { Authorization: "Bearer " + token } }
            )
                .then(res => res.json())
                .then(res => setBalaceAlert(res))
                .catch(rej => console.log(rej.message))
        } catch (err: any) {
            console.log(err.message)
        }
    }

    const fetchCategories = async (): Promise<any[]> => {
        if (!token) return [];
        try {
            const res = await fetch('http://localhost:8080/api/categories', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            const cats: any[] = Array.isArray(data) ? data : [];
            setCategoryList(cats);
            return cats;
        } catch (err) {
            console.error('Error fetching categories:', err);
            setCategoryList([]);
            return [];
        }
    };

    useEffect(() => {
        const now = new Date()
        getMonthlySummary(now.getFullYear() + "-" + (now.getMonth() + 1))
        checkMonthBalance()
        fetchCategories()
    }, [])

    return (
        <section className={'flex'}>
            <div className="h-[94vh] w-full rounded-lg bg-gray-100 p-5 overflow-x-hidden overflow-scroll">
                <div className="flex justify-between border-b border-gray-300 items-center mb-5">
                    <h1 className="text-3xl font-bold p-2 mb-3">
                        {t("dashboard_title", "Dashboard")}
                    </h1>
                </div>
                <AnimatePresence>
                    {(balanceAlert?.alert) && (<motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='flex p-3 px-6 -mt-3 mb-2 items-center border border-amber-300 bg-yellow-100/70 rounded-[10px]'>
                        <h3 className='font-medium text-lg text-gray-800 flex items-center gap-2'><i className="bxr bx-alert-triangle text-yellow-500 text-2xl" />{balanceAlert.message}</h3>
                    </motion.div>)}
                </AnimatePresence>
                <div className={'xl:grid grid-cols-3 flex flex-row w-full justify-evenly gap-6 flex-wrap'}>
                    <StatCard
                        title={t('total_income', 'Total Income')}
                        amount={monthlySummary?.totalIncome}
                        color={'text-green-600'}
                    />
                    <StatCard
                        title={t('total_expenses', 'Total Expenses')}
                        amount={monthlySummary?.totalExpense}
                        color={'text-red-600'}
                    />
                    <StatCard
                        title={t('remaining_balance', 'Remaining Balance')}
                        amount={monthlySummary?.netSavings}
                        color={'text-blue-600'}
                    />
                </div>
                <div className={`flex flex-col m-5`}>
                    <h1 className={`text-2xl font-semibold`}>{t('expenses_categories', 'Expenses Categories')}</h1>
                    <div className='flex justify-center space-x-9 gap-y-3 items-center flex-wrap-reverse'>
                        <PieChart chartValueOptions={chartOptions} />
                        <BarChart chartValueOptions={chartOptions} />
                        <div className="flex flex-row text-lg w-fit gap-10 bg-white rounded-[20px] px-7 py-5 justify-center items-center m-3 shadow">
                            <div className='flex flex-col gap-2 w-1/2'>
                                <div className='w-full flex flex-col gap-1'>
                                    <p className='font-medium text-[16px]'>Start date:</p>
                                    <input
                                        className="border border-gray-300 text-sm p-2 rounded-[5px] bg-white"
                                        type="date"
                                        name="startExpenseDate"
                                        id="startExpenseDate"
                                        defaultValue={new Date(new Date().setFullYear(new Date().getFullYear(), 0, 1)).toISOString().split('T')[0]}
                                        onChange={e => setChartOptions({
                                            start: new Date(e.target.value),
                                            end: chartOptions.end,
                                            category: chartOptions.category,
                                            type: chartOptions.type
                                        })} />
                                </div>
                                <div className='w-full flex flex-col gap-1'>
                                    <p className='font-medium text-[16px]'>End date:</p>
                                    <input
                                        className="border border-gray-300 text-sm p-2 rounded-[5px] bg-white"
                                        type="date" name="endExpenseDate"
                                        id="endExpenseDate"
                                        defaultValue={new Date(new Date().setFullYear(new Date().getFullYear() + 1, 0, 1)).toISOString().split('T')[0]}
                                        onChange={e => setChartOptions({
                                            start: chartOptions.start,
                                            end: new Date(e.target.value),
                                            category: chartOptions.category,
                                            type: chartOptions.type
                                        })} />
                                </div>
                            </div>
                            <div className='flex flex-col gap-2 w-1/2'>
                                <div className='w-full flex flex-col gap-1'>
                                    <p className='font-medium text-[16px]'>Category:</p>
                                    <select
                                        name="categoryId"
                                        className="rounded border border-gray-300 text-sm p-2"
                                        onChange={e => setChartOptions({
                                            start: chartOptions.start,
                                            end: chartOptions.end,
                                            category: e.target.value,
                                            type: chartOptions.type
                                        })}
                                    >
                                        <option value="">Any</option>
                                        {Array.isArray(categoryList) &&
                                            categoryList.map((cat) => (
                                                <option key={cat.name} value={cat.name}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <div className='w-full flex flex-col gap-1'>
                                    <p className='font-medium text-[16px]'>Expense type:</p>
                                    <select
                                        name="expenseType"
                                        className="rounded border border-gray-300 text-sm p-2"
                                        onChange={e => setChartOptions({
                                            start: chartOptions.start,
                                            end: chartOptions.end,
                                            category: chartOptions.category,
                                            type: e.target.value
                                        })}
                                    >
                                        <option value="">Any</option>
                                        <option value="one-time">One-time</option>
                                        <option value="recurring">Recurring</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`flex flex-col mt-5`}>
                    <h1 className={`text-2xl font-semibold border-b-1 border-gray-300 mx-6 pb-3`}>{t('recent_expenses', 'Recent Expenses')}</h1>
                    <div className={`flex flex-col`}>
                        <ExpenseList />
                    </div>
                </div>
            </div>
        </section>
    );
}
