import { useState, useEffect } from "react";

export default function useLocalStorage(key: string, initialValue: string) {
    const [storedValue, setStoredValue] = useState<string>(() => {
        return localStorage.getItem(key) || initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, storedValue);
    }, [key, storedValue]);

    return [storedValue, setStoredValue] as const;
}
