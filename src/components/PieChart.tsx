import {Pie} from "react-chartjs-2";
import {Chart as ChartJS, Tooltip, Legend, ArcElement} from 'chart.js'
import {getExpenses} from "../data/DataFetch.ts";
import {useEffect, useState} from "react";

ChartJS.register(Tooltip, Legend, ArcElement)

export const PieChart = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const options = {
        responsive: true,
        plugins: {
            legend: {position: 'right'}, tooltip: {
                callbacks: {
                    label: function (context: any) {
                        return '$ ' + context.raw
                    }
                }
            }
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const expenses = await getExpenses();
                const expensesByCategory = expenses.reduce((acc, expense) => {
                    const category = expense.category_fk.name;
                    const amount = expense.amount;
                    if (acc[category]) {
                        acc[category] += amount;
                    } else {
                        acc[category] = amount;
                    }
                    return acc;
                }, {});

                const labels = Object.keys(expensesByCategory);
                const data = Object.values(expensesByCategory);
                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Expenses by Category',
                            data,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                });
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
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }
    return (
        <div className={'h-fit w-fit'}>
            {chartData && <Pie options={options} data={chartData}></Pie>}
        </div>
    )
}