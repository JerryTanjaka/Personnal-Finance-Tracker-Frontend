import StatCard from '../components/StatCard.tsx';
import {PieChart} from "../components/PieChart.tsx";
import ExpenseList from "../components/ExpenseList.tsx";
import { useTranslation } from 'react-i18next';

export default function Dashboard() {
    const { t } = useTranslation();

    return (
        <section className={'flex'}>
            <div className="h-[94vh] w-full rounded-lg bg-gray-100 p-5 overflow-scroll">
                <div className="flex justify-between border-b border-gray-300 items-center mb-5">
                    <h1 className="text-3xl font-bold p-2 mb-3">
                        {t("dashboard_title", "Dashboard")}
                    </h1>
                </div>

                <div className={'flex justify-evenly gap-6'}>
                    <StatCard
                        title={t('total_income', 'Total Income')}
                        amount={1000}
                        color={'text-green-600'}
                    />
                    <StatCard
                        title={t('total_expenses', 'Total Expenses')}
                        amount={1000}
                        color={'text-red-600'}
                    />
                    <StatCard
                        title={t('remaining_balance', 'Remaining Balance')}
                        amount={1000}
                        color={'text-blue-600'}
                    />
                </div>
                <div className={`flex flex-col m-5`}>
                    <h1 className={`text-2xl font-semibold`}>Expenses Categoires</h1>
                    <PieChart/>
                </div>
                <div className={`flex flex-col mt-5`}>
                    <h1 className={`text-2xl font-semibold border-b-1 border-gray-300 mx-6 pb-3`}>Recent Expenses</h1>
                    <div className={`flex flex-col`}>
                        <ExpenseList/>
                    </div>
                </div>
            </div>
        </section>
    );
}
