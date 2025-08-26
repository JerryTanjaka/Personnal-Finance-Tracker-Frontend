import { useState } from "react";
import ChangePasswordForm from "../components/Settings/ChangePasswordForm";
import { useTranslation } from "react-i18next";
import ChangeUsernameForm from "../components/Settings/ChangeUsernameForm";

export default function Settings() {
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState<boolean>(false);
    const [isChangeUsernameOpen, setIsChangeUsernameOpen] = useState<boolean>(false)

    const { i18n, t } = useTranslation();
    const [language, setLanguage] = useState<string>(localStorage.getItem("appLanguage") || i18n.language || "en");

    const toggleLanguage = () => {
        const newLang = language === "en" ? "fr" : "en";
        i18n.changeLanguage(newLang);
        setLanguage(newLang);
        localStorage.setItem("appLanguage", newLang);
    };

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
                        <i className="bx bx-lock text-gray-700 text-xl"></i>
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

            <h2 className="font-semibold text-xl mt-6 text-gray-900 mb-2">
                {t("change_language", "Change Language")}
            </h2>
            <p className="text-gray-600 mb-6">
                {t(
                    "language_preference",
                    "Choose in which language you are more comfortable."
                )}
            </p>
            <div className="flex items-center gap-3">
                <span className={`font-medium ${language === "fr" ? "text-gray-900" : "text-gray-500"}`}>FR</span>

                <button
                    onClick={toggleLanguage}
                    className={`w-14 h-8 flex items-center cursor-pointer bg-gray-300 rounded-full p-1 relative transition-colors duration-300 focus:outline-none ${language === "en" ? "bg-blue-500" : "bg-gray-300"}`}
                >
                    <div
                        className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${language === "en" ? "translate-x-6" : "translate-x-0"}`}
                    ></div>
                </button>

                <span className={`font-medium ${language === "en" ? "text-gray-900" : "text-gray-500"}`}>EN</span>
            </div>
        </div>
    );
}
