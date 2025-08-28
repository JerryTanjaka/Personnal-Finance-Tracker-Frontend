import { useState } from "react";

export default function BalanceCard({ title, amount, color }: { title: string, amount: number, color: string }) {
    const [isShowBalance, setShowBalance] = useState(false);

    return (
        <div onClick={() => setShowBalance(!isShowBalance)} className={'flex flex-col cursor-pointer border-1 border-gray-300 rounded-lg p-4 w-full'}>
            {isShowBalance ? (
                <h3 className={'text-nowrap'}>{title}</h3>
            ) : (
                <h2>Show Balance</h2>
            )}
            {isShowBalance ? (
                <h2 className={`text-3xl font-semibold ${color}`}>$ {amount}</h2>
            ) : null}
        </div>
    );
}
