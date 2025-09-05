import { useState } from "react";
import ChangePasswordForm from "../components/Settings/ChangePasswordForm";
import { useTranslation } from "react-i18next";
import ChangeUsernameForm from "../components/Settings/ChangeUsernameForm";
import LanguageToggle from "../components/UI/LanguageToggle";
import DeleteData from "../components/Settings/DeleteData.tsx";

export default function Settings() {
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState<boolean>(false);
    const [isChangeUsernameOpen, setIsChangeUsernameOpen] = useState<boolean>(false)

    const { t } = useTranslation();

    return (
        <div className="bg-gray-100 shadow-md rounded-lg p-8 mx-auto h-[94vh] overflow-y-scroll ">
            <h1 className="text-3xl font-bold text-gray-800 border-b border-gray-300 pb-4 mb-6">
                {t("settings_title", "Settings")}
            </h1>

            <div>
                <h2 className="font-semibold text-xl text-gray-900 mb-2">
                    {t("managing_account_title", "Managing Account")}
                </h2>
                <p className="text-gray-600 mb-6">
                    {t(
                        "managing_account_description",
                        "Change your account settings and preferences."
                    )}
                </p>
            </div>

            <div className="space-y-2">
                <button
                    onClick={() => setIsChangePasswordOpen(!isChangePasswordOpen)}
                    className="flex w-full items-center justify-between px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 transition duration-200 cursor-pointer"
                >
                    <div className="flex items-center gap-3">
                        <i className="bx bx-lock text-gray-700 text-xl"></i>
                        <span className="font-medium text-gray-800">
                            {t("change_password", "Change Password")}
                        </span>
                        <p className="text-gray-500 ml-12">
                            {t(
                                "change_password_description",
                                "Change your password to keep your account safe."
                            )}
                        </p>
                    </div>
                    <i
                        className={`bx bx-chevron-${isChangePasswordOpen ? "up" : "down"
                            } text-xl text-gray-600 transition-transform`}
                    ></i>
                </button>

                <div
                    className={`transition-all duration-300 overflow-hidden ${isChangePasswordOpen
                        ? "max-h-[500px] opacity-100 mt-4"
                        : "max-h-0 opacity-0"
                        }`}
                >
                    <div className="bg-gray-50 border border-gray-200 mb-3 rounded-lg p-6 shadow-sm">
                        <ChangePasswordForm />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <button
                    onClick={() => setIsChangeUsernameOpen(!isChangeUsernameOpen)}
                    className="flex w-full items-center justify-between px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 transition duration-200 cursor-pointer"
                >
                    <div className="flex items-center gap-3">
                        <i className='bxr text-gray-700 text-xl bx-user-circle'  ></i>
                        <span className="font-medium text-gray-800">
                            {t("change_username", "Change Username")}
                        </span>
                        <p className="text-gray-500 ml-12">
                            {t(
                                "change_username_description",
                                "You can change you username at any time."
                            )}
                        </p>
                    </div>
                    <i
                        className={`bx bx-chevron-${isChangeUsernameOpen ? "up" : "down"
                            } text-xl text-gray-600 transition-transform`}
                    ></i>
                </button>

                <div
                    className={`transition-all duration-300 overflow-hidden ${isChangeUsernameOpen
                        ? "max-h-[500px] opacity-100 mt-4"
                        : "max-h-0 opacity-0"
                        }`}
                >
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm">
                        <ChangeUsernameForm />
                    </div>
                </div>
            </div>
            <LanguageToggle />
            <h2 className="font-semibold text-xl text-gray-900 mt-6 mb-2">
                {t("delete_data_title", "Data Managing")}
            </h2>
            <p className="text-gray-500 ml-1">
                {t(
                    "delete_data_description",
                    "Deleting your data is not reversible."
                )}
            </p>
            <DeleteData />
        </div>
    );
}
