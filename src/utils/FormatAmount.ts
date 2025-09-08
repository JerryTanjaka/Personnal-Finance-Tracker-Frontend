export default function formatAmount(amount?: number | string | null): number {
    // accept number, string or undefined/null and return a numeric amount
    if (amount === undefined || amount === null) return 0;
    const n = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (typeof n !== 'number' || isNaN(n)) return 0;
    return n;
}