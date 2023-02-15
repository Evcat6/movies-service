function getItemFromLocalStorage<T>(key: string): T {
    const dataFromStorage: T = JSON.parse(localStorage.getItem(key) || '[]');
    return dataFromStorage;
};

function setItemToLocalStorage<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
}

export { getItemFromLocalStorage, setItemToLocalStorage };
