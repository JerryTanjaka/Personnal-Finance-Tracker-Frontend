import NavBar from '../components/NavBar.tsx';
import StatCard from '../components/StatCard.tsx';

export default function Dashboard() {
    return (
        <section className={'flex'}>
            <div className="my-6 mr-6 h-[94vh] w-full rounded-lg bg-gray-100">
                <h1
                    className={
                        'm-5 border-b-1 border-gray-300 p-2 text-3xl font-bold'
                    }
                >
                    Dashboard
                </h1>
                <div className={'m-5 flex justify-evenly gap-6'}>
                    <StatCard
                        title={'Total Income'}
                        amount={1000}
                        color={'text-green-600'}
                    />
                    <StatCard
                        title={'Total Expenses'}
                        amount={1000}
                        color={'text-red-600'}
                    />
                    <StatCard
                        title={'Remaining Balance'}
                        amount={1000}
                        color={'text-blue-600'}
                    />
                </div>
            </div>
        </section>
    );
}
