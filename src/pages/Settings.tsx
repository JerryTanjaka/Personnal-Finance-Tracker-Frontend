import { useState } from "react"
import ChangePasswordForm from "../components/Settings/ChangePasswordForm";

export default function Settings() {
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

    return (
        <div className="bg-gray-100 shadow-md rounded-lg p-8  mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 border-b pb-4 mb-6">Settings</h1>

            <div>
                <h2 className="font-semibold text-xl text-gray-900 mb-2">Managing Account</h2>
                <p className="text-gray-600 mb-6">Change your account settings and preferences.</p>
            </div>

            <div className="space-y-2">
                <button
                    onClick={() => setIsChangePasswordOpen(!isChangePasswordOpen)}
                    className="flex w-full items-center justify-between px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 transition duration-200 cursor-pointer"
                >
                    <div className="flex items-center gap-3">
                        <i className="bx bx-lock text-gray-700 text-xl"></i>
                        <span className="font-medium text-gray-800">Change Password</span>
                        <p className="text-gray-500 ml-12">
                            Change your password to keep your account safe.
                        </p>
                    </div>
                    <i
                        className={`bx bx-chevron-${isChangePasswordOpen ? "up" : "down"} text-xl text-gray-600 transition-transform`}
                    ></i>
                </button>

                <div
                    className={`transition-all duration-300 overflow-hidden ${isChangePasswordOpen ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
                        }`}
                >
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm">
                        <ChangePasswordForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
