import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function TermsAndConditions() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState<string>(i18n.language || "en");

  const toggleLanguage = () => {
    const newLang = language === "en" ? "fr" : "en";
    i18n.changeLanguage(newLang);
    setLanguage(newLang);
  };

  return (
    <div className="bg-gray-100 shadow-md rounded-lg p-8 mx-auto h-[94vh] overflow-y-auto">
      <h1 className="text-3xl font-bold text-gray-800 border-b pb-4 mb-6">
        {t("terms_title")}
      </h1>

      <section className="mb-6">
        <h2 className="font-semibold text-xl text-gray-900 mb-2">
          {t("terms_intro_title")}
        </h2>
        <p className="text-gray-600 whitespace-pre-line">
          {t("terms_intro_text")}
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-xl text-gray-900 mb-2">
          {t("user_obligations_title")}
        </h2>
        <p className="text-gray-600 whitespace-pre-line">
          {t("user_obligations_text")}
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-xl text-gray-900 mb-2">
          {t("privacy_title")}
        </h2>
        <p className="text-gray-600 whitespace-pre-line">
          {t("privacy_text")}
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-xl text-gray-900 mb-2">
          {t("disclaimer_title")}
        </h2>
        <p className="text-gray-600 whitespace-pre-line">
          {t("disclaimer_text")}
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-xl text-gray-900 mb-2">
          {t("changes_title")}
        </h2>
        <p className="text-gray-600 whitespace-pre-line">
          {t("changes_text")}
        </p>
      </section>

      <div className="mt-8 flex items-center gap-3">
        <span
          className={`font-medium ${language === "fr" ? "text-gray-900" : "text-gray-500"}`}
        >
          FR
        </span>

        <button
          onClick={toggleLanguage}
          className={`w-14 h-8 flex items-center cursor-pointer bg-gray-300 rounded-full p-1 relative transition-colors duration-300 focus:outline-none ${
            language === "en" ? "bg-blue-500" : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
              language === "en" ? "translate-x-6" : "translate-x-0"
            }`}
          ></div>
        </button>

        <span
          className={`font-medium ${language === "en" ? "text-gray-900" : "text-gray-500"}`}
        >
          EN
        </span>
      </div>
    </div>
  );
}
