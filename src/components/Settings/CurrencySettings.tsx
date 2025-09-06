import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { CurrencyContext } from '../../context/CurrencyContext';

const currencies = [
    { code: 'EUR', label: 'Euro (€)' },
    { code: 'USD', label: 'Dollar ($)' },
    { code: 'MGA', label: 'Ariary (Ar)' },
];

export default function CurrencySettings() {
    const { t } = useTranslation();
    const { currency, setCurrency } = useContext(CurrencyContext);

    const handleCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrency(event.target.value);
    };

    return (
        <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
                {t('currency_settings_title', 'Currency')}
            </h2>

            <div className="flex gap-6">
                {currencies.map((c) => (
                    <label
                        key={c.code}
                        className="inline-flex items-center gap-2 cursor-pointer group"
                    >
                        <input
                            type="radio"
                            name="currency"
                            value={c.code}
                            checked={currency === c.code}
                            onChange={handleCurrencyChange}
                            className="hidden"
                        />
                        <span
                            className={`px-4 py-2 rounded-full border text-sm transition
                ${currency === c.code
                                    ? 'bg-blue-500 text-white border-blue-500'
                                    : 'border-gray-300 text-gray-700 dark:text-gray-500 hover:border-blue-400 hover:text-blue-600'
                                }`}
                        >
                            {c.label}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
}
