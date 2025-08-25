import NavBar from "../component/NavBar.tsx";
import StatCard from "../component/StatCard.tsx";

export default function Dashboard() {
    return (
        <section className={'flex'}>
            <NavBar />
            <div className="h-[94vh] bg-gray-100 rounded-lg my-6 mr-6 w-full">
                <h1 className={'text-3xl font-bold m-5 border-b-1 border-gray-300 p-2'}>Dashboard</h1>
                <div className={'flex justify-evenly m-5 gap-6'}>
                    <StatCard title={'Total Income'} amount={1000} color={'text-green-600'} />
                    <StatCard title={'Total Expenses'} amount={1000} color={'text-red-600'} />
                    <StatCard title={'Remaining Balance'} amount={1000} color={'text-blue-600'}/>
                </div>
            </div>
        </section>
    );
}