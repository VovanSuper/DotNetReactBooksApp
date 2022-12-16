
export const convertToConventionalNum = (val: number | string, defaultVal = 0) => parseInt(val.toString()) || defaultVal;

export const isValue = <T>(val: T | undefined | null): val is T => {
    return val !== undefined && val !== null;
};

