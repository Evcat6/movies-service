const getItemFromLocalStorage = (key: string) => {
    return JSON.parse(localStorage.getItem(key) || '[]');
};

function setItemToLocalStorage<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
}

export { getItemFromLocalStorage, setItemToLocalStorage };
