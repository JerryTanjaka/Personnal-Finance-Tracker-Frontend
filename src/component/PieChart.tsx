import {Pie} from "react-chartjs-2";
import {Chart as ChartJS, Tooltip, Legend, ArcElement} from 'chart.js'
import {PieData} from "../data/PieData";

ChartJS.register(Tooltip, Legend, ArcElement)

export const PieChart = () => {
    const options = { responsive: true, plugins: { legend: { position: 'right' } , tooltip: { callbacks: { label: function(context: any) { return '$ '+context.raw  } } }}}
    return (
        <div className={'h-[40vh] w-full'}>
            <Pie options={options} data={PieData}></Pie>
        </div>
    )
}