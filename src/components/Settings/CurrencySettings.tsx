
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { CurrencyContext } from '../../context/CurrencyContext';

export default function CurrencySettings() {
    const { t } = useTranslation();
    const { currency, setCurrency } = useContext(CurrencyContext);

    const handleCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrency(event.target.value);
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold">{t('currency_settings_title', 'Currency')}</h2>
            <div className="mt-2">
                <label className="inline-flex items-center">
                    <input
                        type="radio"
                        className="form-radio"
                        name="currency"
                        value="EUR"
                        checked={currency === 'EUR'}
                        onChange={handleCurrencyChange}
                    />
                    <span className="ml-2">Euro (€)</span>
                </label>
            </div>
            <div className="mt-2">
                <label className="inline-flex items-center">
                    <input
                        type="radio"
                        className="form-radio"
                        name="currency"
                        value="USD"
                        checked={currency === 'USD'}
                        onChange={handleCurrencyChange}
                    />
                    <span className="ml-2">Dollar ($)</span>
                </label>
            </div>
            <div className="mt-2">
                <label className="inline-flex items-center">
                    <input
                        type="radio"
                        className="form-radio"
                        name="currency"
                        value="MGA"
                        checked={currency === 'MGA'}
                        onChange={handleCurrencyChange}
                    />
                    <span className="ml-2">Ariary (Ar)</span>
                </label>
            </div>
        </div>
    );
}
