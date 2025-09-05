import { createContext, useState } from 'react';

export const CurrencyContext = createContext({
    currency: 'EUR',
    setCurrency: (currency: string) => {},
});

export const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState('EUR');

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency }}>
            {children}
        </CurrencyContext.Provider>
    );
};
