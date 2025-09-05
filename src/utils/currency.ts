export const formatCurrency = (amount: number, currency: string) => {
    switch (currency) {
        case 'USD':
            return `$${amount.toFixed(2)}`;
        case 'MGA':
            return `${amount.toFixed(2)} Ar`;
        case 'EUR':
        default:
            return `${amount.toFixed(2)} €`;
    }
};
