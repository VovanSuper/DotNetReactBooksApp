import { useCallback, useEffect, useState } from 'react';

import { isValue } from '@books-client/const';

const useStorage = <T>(key: string, storage: Storage = window.localStorage, defaultValue?: T) => {
    const [value, setValue] = useState<T>(() => {
        const jsonValue = storage.getItem(key);
        if (isValue(jsonValue)) return JSON.parse(jsonValue);

        return defaultValue;
    });

    useEffect(() => {
        if (!isValue(value)) return storage.removeItem(key);
        storage.setItem(key, JSON.stringify(value));
    }, [key, value, storage]);

    const removeValue = useCallback(() => {
        setValue(undefined as unknown as T);
    }, []);

    return [value, setValue, removeValue] as const;
};

const useLocalStorage = <T>(key: string, defaultValue?: T) => {
    return useStorage<T>(key, window.localStorage, defaultValue);
};

const useSessionStorage = <T>(key: string, defaultValue?: T) => {
    return useStorage<T>(key, window.sessionStorage, defaultValue);
};

export { useLocalStorage, useSessionStorage };
