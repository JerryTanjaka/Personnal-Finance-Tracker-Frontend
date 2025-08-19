export default function LogIn() {
    return (
        <section className="grid place-items-center h-screen">
            <div className="flex flex-col items-center gap-8">
                <h1 className="font-bold nata-sans text-3xl">LOG IN</h1>
                <div className="flex flex-col gap-4">
                    <input type="email" placeholder="Email" className="border-b-2 border-gray-300"/>
                    <input type="password" placeholder="Password" className="border-b-2 border-gray-300"/>
                </div>
                <button className="px-4 py-2 border-4 border-b-black rounded-xl ">Log In</button>
            </div>
        </section>
    )
}